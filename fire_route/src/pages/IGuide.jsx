import { useState, useEffect } from 'react'

const CDN_IGUIDE_BASE = import.meta.env.VITE_CDN_BASE_IGUIDE
const TOUR_PATH = `${import.meta.env.BASE_URL}iGuide/index.html`

export default function IGuide() {
  const [html, setHtml] = useState(null)

  useEffect(() => {
    fetch(TOUR_PATH)
      .then(r => r.text())
      .then(text => setHtml(
        text.replace('<head>', `<head><base href="${CDN_IGUIDE_BASE}">`)
      ))
  }, [])

  if (!html) return null

  return (
    <iframe
      srcDoc={html}
      className="iguide-frame"
      scrolling="no"
      frameBorder="0"
      allowFullScreen
    />
  )
}
