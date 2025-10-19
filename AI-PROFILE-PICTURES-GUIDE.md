# AI Profile Pictures Guide

## Overview
Generate AI profile pictures for the MySpace landing page using various AI tools.

## Required Images

### Main Profile Picture
- **File:** `images/profiles/jbyrd-profile.jpg`
- **Size:** 200x250px (portrait orientation)
- **Prompt:** "Professional portrait of a confident tech professional in their 30s, wearing casual business attire, friendly expression, studio lighting, high quality, realistic"

### Friend Profile Pictures (100x100px each)
1. **ansible-friend.jpg** - "Playful cartoon mascot representing automation, red theme, friendly robot character"
2. **podman-friend.jpg** - "Cute cartoon container/pod character, blue theme, tech mascot style"
3. **grafana-friend.jpg** - "Friendly dashboard character with graph elements, orange/green theme"
4. **traefik-friend.jpg** - "Network traffic controller character, orange theme, tech mascot"

## AI Image Generation Options

### Option 1: Leonardo.ai (Recommended - Free Tier Available)
**URL:** https://leonardo.ai/
**Steps:**
1. Create free account (150 credits daily)
2. Use "Leonardo Diffusion XL" model
3. Set dimensions to 512x640 for profile, 512x512 for friends
4. Use prompts above
5. Download and resize if needed

**Example Profile Prompt:**
```
Portrait photo of a 35-year-old male tech professional, short beard, glasses, 
confident friendly smile, wearing dark polo shirt, studio lighting, 
professional headshot, high quality, realistic, 4k
```

### Option 2: Midjourney (Paid, $10/mo)
**URL:** https://midjourney.com/
**Discord Bot Commands:**
```
/imagine Portrait of a professional tech enthusiast, 35 years old, 
friendly expression, studio lighting --ar 4:5 --v 6

/imagine Cute mascot character for Ansible automation tool, 
cartoon style, red color scheme, friendly robot --ar 1:1 --v 6
```

### Option 3: Stable Diffusion (Free, Self-Hosted)
**URL:** https://huggingface.co/spaces/stabilityai/stable-diffusion
**Steps:**
1. Visit Hugging Face space
2. Enter prompt
3. Generate and download
4. Repeat for each image

### Option 4: Craiyon (Free, No Login)
**URL:** https://craiyon.com/
- Fast and simple
- Lower quality but good for placeholders
- No account required

## Image Specifications

### Profile Picture (jbyrd-profile.jpg)
- Dimensions: 200x250px
- Format: JPEG
- Quality: High (90%+)
- Style: Realistic portrait

### Friend Pictures (100x100px each)
- Dimensions: 100x100px
- Format: JPEG or PNG
- Quality: Medium-High (80%+)
- Style: Cartoon/Mascot style

## Deployment Process

### 1. Generate Images
Use any tool above to generate the 5 images

### 2. Save to Directory
```bash
# On your local machine
scp jbyrd-profile.jpg miraclemax:/home/jbyrd/miraclemax-infrastructure/web/myspace-landing/images/profiles/
scp ansible-friend.jpg miraclemax:/home/jbyrd/miraclemax-infrastructure/web/myspace-landing/images/profiles/
scp podman-friend.jpg miraclemax:/home/jbyrd/miraclemax-infrastructure/web/myspace-landing/images/profiles/
scp grafana-friend.jpg miraclemax:/home/jbyrd/miraclemax-infrastructure/web/myspace-landing/images/profiles/
scp traefik-friend.jpg miraclemax:/home/jbyrd/miraclemax-infrastructure/web/myspace-landing/images/profiles/
```

### 3. HTML Already Updated
The HTML will be updated to reference these local files automatically.

## Quick Prompts for Copy/Paste

### Profile Picture Prompt
```
Professional portrait photograph of a 35-year-old male technical account manager, 
short dark hair, short beard, wearing glasses, confident and friendly smile, 
wearing a dark casual business shirt, clean studio background, 
professional headshot quality, realistic, high detail, soft lighting, 4k
```

### Ansible Friend
```
Cute cartoon mascot character for Ansible automation, friendly robot with wrench, 
red color scheme, playful expression, tech industry style, 
simple background, mascot logo style
```

### Podman Friend
```
Adorable container pod character, blue whale inspired, 
tech mascot style, friendly face, cute eyes, 
blue color scheme, simple background, logo style
```

### Grafana Friend
```
Friendly dashboard character with graph elements as features, 
orange and green color scheme, chart lines incorporated into design, 
tech mascot style, playful and approachable
```

### Traefik Friend
```
Traffic controller character mascot, orange color scheme, 
network router theme, friendly expression, geometric shapes, 
tech industry mascot style, simple background
```

## Quick Generation with ChatGPT/DALL-E

If you have ChatGPT Plus:
1. Ask ChatGPT to generate each image with the prompts above
2. Download the images
3. Rename and upload as described

---

**Status:** Ready for image generation  
**Next Step:** Generate images using your preferred tool, then upload to MiracleMax

