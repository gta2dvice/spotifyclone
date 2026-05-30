const DEFAULT_COLORS = {
  primary: '#6b5b7a',
  secondary: '#8a8494',
  accent: '#9d8fb8',
}

export function extractColorsFromImage(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = 48
        canvas.height = 48
        ctx.drawImage(img, 0, 0, 48, 48)
        const { data } = ctx.getImageData(0, 0, 48, 48)

        let r = 0
        let g = 0
        let b = 0
        let count = 0

        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3]
          if (alpha < 40) continue
          r += data[i]
          g += data[i + 1]
          b += data[i + 2]
          count += 1
        }

        if (!count) {
          resolve(DEFAULT_COLORS)
          return
        }

        r = Math.round(r / count)
        g = Math.round(g / count)
        b = Math.round(b / count)

        const primary = `rgb(${Math.min(255, r + 30)}, ${Math.min(255, g + 10)}, ${Math.min(255, b + 40)})`
        const secondary = `rgb(${Math.max(0, r - 20)}, ${Math.max(0, g - 15)}, ${Math.max(0, b - 10)})`
        const accent = `rgb(${Math.min(255, r + 50)}, ${Math.min(255, g + 30)}, ${Math.min(255, b + 60)})`

        resolve({ primary, secondary, accent })
      } catch {
        resolve(DEFAULT_COLORS)
      }
    }

    img.onerror = () => resolve(DEFAULT_COLORS)
    img.src = url
  })
}

export { DEFAULT_COLORS }
