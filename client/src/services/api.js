const API_BASE = import.meta.env.VITE_API_URL || '/api'

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`)
  }
  if (response.status === 204) {
    return null
  }
  return response.json()
}

export function getSongs() {
  return request('/songs')
}

export function getPlaylists() {
  return request('/playlists')
}

export function getPlaylistById(id) {
  return request(`/playlist/${id}`)
}

export function getLikedSongs() {
  return request('/liked')
}

export function checkLiked(songId) {
  return request(`/liked/check/${songId}`)
}

export function likeSong(songId) {
  return request(`/liked/${songId}`, { method: 'POST' })
}

export function unlikeSong(songId) {
  return request(`/liked/${songId}`, { method: 'DELETE' })
}
