# Ntando Mods API

A powerful API platform with React frontend featuring YouTube search, video conversion, ChatGPT, and weather services.

## Features

- 🔍 **YouTube Search** - Search for videos
- 💬 **ChatGPT** - AI chat assistant
- 🎵 **YT to MP3** - Convert YouTube videos to audio
- 🎬 **YT to MP4** - Download YouTube videos
- 🌤️ **Weather** - Get weather information

## Backend Deployment (Render)

1. Push your backend code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: ntando-mods-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`
6. Add environment variables if needed
7. Click "Create Web Service"

## Frontend Deployment (Vercel)

1. Push your frontend code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add environment variable:
   - `VITE_API_URL`: Your Render backend URL
7. Click "Deploy"

## Local Development

### Backend
```bash
cd backend
npm install
npm run dev
