// Spotify Web Playback SDK Integration
// Replace YOUR_CLIENT_ID with your actual Spotify Client ID

const SPOTIFY_CONFIG = {
    clientId: '0d3668e069af4fe8a1d17b8d77785a5c',
    redirectUri: 'https://jbyrd.org/spotify-callback.html',
    scopes: [
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-read-playback-state',
        'user-modify-playback-state'
    ]
};

class SpotifyPlayer {
    constructor() {
        this.player = null;
        this.deviceId = null;
        this.accessToken = localStorage.getItem('spotify_access_token');
        this.currentTrackIndex = 0;
        
        // Track URIs for the playlist
        this.playlistUris = [
            'spotify:track:003vvx7Niy0yvhvHt4a68B', // Mr. Brightside - The Killers
            'spotify:track:6oJ6le65B3SEqPwMRNXWjY', // In Too Deep - Sum 41
            'spotify:track:3YBZIN3rekqsKxbJc9FZko', // The Middle - Jimmy Eat World
            'spotify:track:3UazzelPQVpLp5E0wXfA5i', // Sk8er Boi - Avril Lavigne
            'spotify:track:3cfOd4CMv2snFaKAnMdnvK'  // All Star - Smash Mouth
        ];
        
        this.trackInfo = [
            { title: "Mr. Brightside - The Killers", artist: "Hot Fuss (2004)" },
            { title: "In Too Deep - Sum 41", artist: "All Killer No Filler (2001)" },
            { title: "The Middle - Jimmy Eat World", artist: "Bleed American (2001)" },
            { title: "Sk8er Boi - Avril Lavigne", artist: "Let Go (2002)" },
            { title: "All Star - Smash Mouth", artist: "Astro Lounge (1999)" }
        ];
    }

    // Authenticate with Spotify
    authenticate() {
        const authUrl = `https://accounts.spotify.com/authorize?` +
            `client_id=${SPOTIFY_CONFIG.clientId}` +
            `&response_type=token` +
            `&redirect_uri=${encodeURIComponent(SPOTIFY_CONFIG.redirectUri)}` +
            `&scope=${encodeURIComponent(SPOTIFY_CONFIG.scopes.join(' '))}`;
        
        // Open in popup
        const width = 450;
        const height = 730;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;
        
        window.open(
            authUrl,
            'Spotify Login',
            `width=${width},height=${height},left=${left},top=${top}`
        );
    }

    // Initialize Spotify Web Playback SDK
    async init() {
        if (!this.accessToken) {
            console.log('No Spotify token found. User needs to authenticate.');
            return false;
        }

        return new Promise((resolve) => {
            // Load Spotify SDK
            if (!window.Spotify) {
                const script = document.createElement('script');
                script.src = 'https://sdk.scdn.co/spotify-player.js';
                document.head.appendChild(script);
            }

            window.onSpotifyWebPlaybackSDKReady = () => {
                this.player = new window.Spotify.Player({
                    name: "jbyrd's MySpace Player",
                    getOAuthToken: cb => { cb(this.accessToken); },
                    volume: 0.7
                });

                // Ready
                this.player.addListener('ready', ({ device_id }) => {
                    console.log('Spotify player ready!', device_id);
                    this.deviceId = device_id;
                    resolve(true);
                });

                // Not Ready
                this.player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device has gone offline', device_id);
                });

                // Player state changed
                this.player.addListener('player_state_changed', (state) => {
                    if (state) {
                        this.updateUIFromState(state);
                    }
                });

                // Connect
                this.player.connect();
            };
        });
    }

    // Update UI based on Spotify state
    updateUIFromState(state) {
        const track = state.track_window.current_track;
        
        // Update display (optional - keep showing our track list for retro feel)
        // document.getElementById('track-title').textContent = track.name;
        // document.getElementById('track-artist').textContent = track.artists[0].name;
        
        // Update play button
        const playBtn = document.querySelector('.play-btn');
        if (playBtn) {
            playBtn.textContent = state.paused ? '▶' : '⏸';
        }
        
        // Animate visualizer
        const bars = document.querySelectorAll('.visualizer .bar');
        bars.forEach(bar => {
            bar.style.animationPlayState = state.paused ? 'paused' : 'running';
        });
    }

    // Play track by index
    async playTrack(index) {
        if (!this.deviceId) return;
        
        this.currentTrackIndex = index;
        
        // Update UI
        document.getElementById('track-title').textContent = this.trackInfo[index].title;
        document.getElementById('track-artist').textContent = this.trackInfo[index].artist;
        
        // Play on Spotify
        await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`, {
            method: 'PUT',
            body: JSON.stringify({
                uris: [this.playlistUris[index]]
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.accessToken}`
            }
        });
    }

    // Toggle play/pause
    async togglePlay() {
        if (!this.player) return;
        
        this.player.togglePlay();
    }

    // Next track
    async nextTrack() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlistUris.length;
        await this.playTrack(this.currentTrackIndex);
    }

    // Previous track
    async prevTrack() {
        this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlistUris.length) % this.playlistUris.length;
        await this.playTrack(this.currentTrackIndex);
    }

    // Shuffle
    async shuffle() {
        this.currentTrackIndex = Math.floor(Math.random() * this.playlistUris.length);
        await this.playTrack(this.currentTrackIndex);
    }
}

// Global instance
const spotifyPlayer = new SpotifyPlayer();

// Listen for auth success from popup
window.addEventListener('message', async (event) => {
    if (event.data.type === 'spotify_auth_success') {
        console.log('Spotify authenticated!');
        await spotifyPlayer.init();
    }
});

