import { useState, useEffect } from 'react'
import './VideoPlayer.css'

const CDN_VIDEO_BASE = import.meta.env.VITE_CDN_BASE_BACKGROUND_VIDEO
const VIDEO_JSON = `${import.meta.env.BASE_URL}videos/background-video.json`
const THUMBNAIL_SRC = `${import.meta.env.BASE_URL}images/thumbnail.jpg`

export default function VideoPlayer() {
  const [videoSrc, setVideoSrc] = useState(null)

  useEffect(() => {
    fetch(VIDEO_JSON)
      .then(r => r.json())
      .then(data => setVideoSrc(`${CDN_VIDEO_BASE}${data[0].filename}`))
  }, [])

  if (!videoSrc) return null

  return (
    <video className="property-video" controls playsInline poster={THUMBNAIL_SRC}>
      <source src={videoSrc} type="video/mp4" />
    </video>
  )
}
