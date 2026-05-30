CREATE DATABASE IF NOT EXISTS spotify_clone;
USE spotify_clone;

CREATE TABLE IF NOT EXISTS songs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  cover_url VARCHAR(500) NOT NULL,
  duration VARCHAR(10) DEFAULT '3:00'
);

CREATE TABLE IF NOT EXISTS playlists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cover_url VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS playlist_songs (
  playlist_id INT NOT NULL,
  song_id INT NOT NULL,
  PRIMARY KEY (playlist_id, song_id),
  FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
  FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS liked_songs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  song_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_song (song_id),
  FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE
);

DELETE FROM playlist_songs;
DELETE FROM playlists;
DELETE FROM songs;

INSERT INTO songs (id, title, artist, file_url, cover_url, duration) VALUES
(1, 'Night Waves', 'Nova Bloom', '/media/audio/night-waves.mp3', '/media/images/night-waves.svg', '3:11'),
(2, 'Echo Heart', 'Zayn River', '/media/audio/echo-heart.mp3', '/media/images/echo-heart.svg', '2:56'),
(3, 'Sapphire Sky', 'Ari Cole', '/media/audio/sapphire-sky.mp3', '/media/images/sapphire-sky.svg', '3:42'),
(4, 'Afterglow Run', 'Luna Drift', '/media/audio/afterglow-run.mp3', '/media/images/afterglow-run.svg', '3:19'),
(5, 'City Pulse', 'Metroline', '/media/audio/city-pulse.mp3', '/media/images/city-pulse.svg', '3:06'),
(6, 'Velvet Drift', 'Milo Grey', '/media/audio/velvet-drift.mp3', '/media/images/velvet-drift.svg', '4:01');

INSERT INTO playlists (id, name, cover_url) VALUES
(1, 'Daily Mix 1', '/media/images/daily-mix-1.svg'),
(2, 'Chill Nights', '/media/images/chill-nights.svg'),
(3, 'Focus Flow', '/media/images/focus-flow.svg');

INSERT INTO playlist_songs (playlist_id, song_id) VALUES
(1, 1), (1, 2), (1, 3),
(2, 2), (2, 4), (2, 6),
(3, 1), (3, 5), (3, 6);
