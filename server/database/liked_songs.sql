-- Liked songs table (run against spotify_clone database)
USE spotify_clone;

CREATE TABLE IF NOT EXISTS liked_songs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  song_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_song (song_id),
  FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE
);
