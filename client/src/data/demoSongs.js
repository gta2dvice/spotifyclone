const DEMO_COVER =
  'data:image/svg+xml,' +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f8f4ff"/>
        <stop offset="45%" stop-color="#e8d4ff"/>
        <stop offset="100%" stop-color="#7c3aed"/>
      </linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#bg)"/>
    <path fill="#fff" opacity="0.95" d="M200 118c-38 0-69 31-69 69s31 69 69 69 69-31 69-69-31-69-69-69zm-8 98v-52l44 26-44 26z"/>
  </svg>`)

export const DEMO_SONGS = [
  {
    id: 'demo-gods-plan',
    title: "God's Plan (Lyric Video)",
    artist: 'Drake',
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover_url: DEMO_COVER,
    duration: '3:19',
  },
  {
    id: 'demo-night-waves',
    title: 'Night Waves',
    artist: 'Nova Bloom',
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover_url: DEMO_COVER,
    duration: '3:11',
  },
  {
    id: 'demo-echo-heart',
    title: 'Echo Heart',
    artist: 'Zayn River',
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover_url: DEMO_COVER,
    duration: '2:56',
  },
  {
    id: 'demo-sapphire',
    title: 'Sapphire Sky',
    artist: 'Ari Cole',
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    cover_url: DEMO_COVER,
    duration: '3:42',
  },
]
