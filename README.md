# Spotify Web Clone (Full Stack)

A premium-style Spotify-inspired web clone built with React + Vite, Express, and MySQL.

## Tech Stack

- Frontend: React (Vite), React Router, CSS
- Backend: Node.js, Express.js
- Database: MySQL

## Project Structure

- `client` - React frontend
- `server` - Express backend
- `server/routes` - API routes
- `server/controllers` - request handlers
- `server/models` - MySQL data access
- `server/public` - static media (audio/images)
- `server/database/schema.sql` - database schema + sample data

## Features

- Responsive Spotify-like dark UI
- Sidebar + dynamic routed pages
- Home, Playlist, and Search pages
- Global bottom player with:
  - Play / pause
  - Next / previous
  - Seek bar
  - Volume control
  - Live song progress UI
  - Active song highlight in lists
- Smooth transitions, hover effects, loading skeletons, and gradient visuals
- REST API backed by MySQL (no static mock JSON)

## Backend API

- `GET /api/songs` - fetch all songs
- `GET /api/playlists` - fetch all playlists
- `GET /api/playlist/:id` - fetch one playlist with its songs
- `GET /api/health` - health check

Static media is served from:

- `GET /media/audio/*`
- `GET /media/images/*`

## Local Setup

### 1) MySQL Setup

1. Create a MySQL database by running:
   - `server/database/schema.sql`
2. This creates:
   - `songs`
   - `playlists`
   - `playlist_songs`
3. Add your own MP3 files to `server/public/audio` using names listed in:
   - `server/public/audio/README.txt`

### 2) Backend Setup

```bash
cd server
npm install
copy .env.example .env
node server.js
```

Update `.env` with your real MySQL credentials if needed.

### 3) Frontend Setup

```bash
cd client
npm install
copy .env.example .env
npm run dev
```

Frontend runs on Vite dev server and calls backend on `http://localhost:5000`.

## Notes

- Playlist/song cover placeholders are already included as SVG files in `server/public/images`.
- If MP3 files are missing, UI still loads but playback cannot start until valid audio files are added.
