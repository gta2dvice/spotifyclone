const path = require('path')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const db = require('./config/db')   // ✅ ADD THIS
const { seedIfEmpty } = require('./database/seedData')
const songRoutes = require('./routes/songRoutes')
const playlistRoutes = require('./routes/playlistRoutes')
const likedRoutes = require('./routes/likedRoutes')
const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
app.use('/media', express.static(path.join(__dirname, 'public')))
app.use('/api', songRoutes)
app.use('/api', playlistRoutes)
app.use('/api', likedRoutes)
app.get('/api/health', (_, res) => {
  res.json({ status: 'ok' })
})
app.get('/', (_, res) => {
  res.send(`
    <div style="font-family: system-ui, -apple-system, sans-serif; text-align: center; padding: 3rem; background: #121212; color: white; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; margin: 0; box-sizing: border-box;">
      <h1 style="color: #1db954; font-size: 2.5rem; margin-bottom: 0.5rem;">Spotify Clone Backend</h1>
      <p style="color: #b3b3b3; font-size: 1.2rem; margin-top: 0;">You are accessing the API server.</p>
      <div style="margin-top: 2rem; display: flex; flex-direction: column; gap: 1rem; align-items: center;">
        <p style="color: #ffffff; margin-bottom: 0.5rem;">To open the main application interface, click one of the links below:</p>
        <a href="http://localhost:5173" style="color: #1db954; font-weight: bold; text-decoration: none; font-size: 1.1rem; border: 2px solid #1db954; padding: 0.6rem 2rem; border-radius: 50px; transition: all 0.2s ease-in-out; width: fit-content;" onmouseover="this.style.background='#1db954'; this.style.color='black'" onmouseout="this.style.background='transparent'; this.style.color='#1db954'">
          Open App (Port 5173)
        </a>
        <a href="http://localhost:5174" style="color: #1db954; font-weight: bold; text-decoration: none; font-size: 1.1rem; border: 2px solid #1db954; padding: 0.6rem 2rem; border-radius: 50px; transition: all 0.2s ease-in-out; width: fit-content;" onmouseover="this.style.background='#1db954'; this.style.color='black'" onmouseout="this.style.background='transparent'; this.style.color='#1db954'">
          Open App (Port 5174)
        </a>
      </div>
    </div>
  `)
})
async function startServer() {
  try {
    await db.query('SELECT 1')
    console.log('MySQL Connected ✅')
    const [columns] = await db.query('SHOW COLUMNS FROM songs LIKE "lyrics"')
    if (columns.length === 0) {
      await db.query('ALTER TABLE songs ADD COLUMN lyrics TEXT NULL')
      console.log('Added lyrics column to songs table ✅')
    }
    await db.query(`
      CREATE TABLE IF NOT EXISTS liked_songs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        song_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_song (song_id),
        FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE
      )
    `)
    console.log('liked_songs table ready ✅')
    const { seeded } = await seedIfEmpty()
    if (seeded) {
      console.log('Sample music data inserted ✅')
    }
  } catch (err) {
    console.error('MySQL Connection Failed ❌', err.message)
  }
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}
startServer()