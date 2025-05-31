# RangerEye Deployment Guide

## Project Overview
RangerEye is an autonomous wildfire detection drone system built with React, featuring live NASA FIRMS fire detection, team profiles, and mission control interfaces.

## GitHub Setup

1. **Create GitHub Repository**
   ```bash
   # Create a new repository on GitHub named: rangereye-wildfire-detection
   # Make it public for Netlify access
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "RangerEye autonomous wildfire detection system"
   git remote add origin https://github.com/YOUR_USERNAME/rangereye-wildfire-detection.git
   git push -u origin main
   ```

## Netlify Deployment

1. **Connect Repository**
   - Go to netlify.com
   - Click "New site from Git"
   - Select your GitHub repository

2. **Build Settings** (Auto-detected from netlify.toml)
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

3. **Environment Variables** (if needed)
   - NASA_FIRMS_API_KEY (for live fire data)

## Features Included
- ✅ Live NASA FIRMS wildfire detection
- ✅ Autonomous drone telemetry dashboard
- ✅ Team profiles with LinkedIn integration
- ✅ Mission control interface
- ✅ Ground stations visualization
- ✅ CAD viewer for 3D models
- ✅ Responsive design
- ✅ SEO optimization

## Live URL
After deployment, your site will be available at:
`https://your-app-name.netlify.app`

## Auto-deployment
Every push to GitHub will trigger automatic rebuilds on Netlify.