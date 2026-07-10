import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Carousel.css'

const CDN_BASE = 'https://d13umf114s6tcz.cloudfront.net/images/72-Fire-Rte-98-1/'
const JSON_PATH = `${import.meta.env.BASE_URL}images/72-Fire-Rte-98-1.json`
const INTERVAL_MS = 3500
const TRANSITION_MS = 700

// offset: 0=center, ±1=adjacent, ±2=far, ±3+=exiting
function slideStyle(offset) {
  const abs = Math.abs(offset)
  const sign = Math.sign(offset)
  const levels = [
    { x: 0,   scale: 1.00, opacity: 1.00 },
    { x: 78,  scale: 0.83, opacity: 0.75 },
    { x: 150, scale: 0.68, opacity: 0.35 },
    { x: 210, scale: 0.55, opacity: 0.00 },
  ]
  const c = levels[Math.min(abs, levels.length - 1)]
  return {
    transform: `translateX(${sign * c.x}%) scale(${c.scale})`,
    opacity: c.opacity,
    zIndex: 10 - abs,
  }
}

// Hidden img tag that forces the browser to fetch and cache an upcoming image.
function Preload({ src }) {
  return src ? <img src={src} alt="" aria-hidden="true" className="carousel-preload" /> : null
}

export default function Carousel() {
  const [srcs, setSrcs] = useState([])
  const [cards, setCards] = useState([])
  const [dot, setDot] = useState(0)
  const [preloadSrc, setPreloadSrc] = useState(null)
  const keyRef = useRef(0)
  const nextSrcRef = useRef(0)

  useEffect(() => {
    fetch(JSON_PATH)
      .then(r => r.json())
      .then(data => setSrcs(data.map(item => `${CDN_BASE}${item.filename}`)))
  }, [])

  useEffect(() => {
    if (!srcs.length) return
    setCards(
      [-2, -1, 0, 1, 2].map((offset, i) => ({
        key: keyRef.current++,
        src: srcs[i % srcs.length],
        offset,
      }))
    )
    nextSrcRef.current = 5 % srcs.length
    // Preload the first upcoming image immediately
    setPreloadSrc(srcs[nextSrcRef.current])
  }, [srcs])

  useEffect(() => {
    if (!srcs.length) return
    const t = setInterval(() => {
      const newSrc = srcs[nextSrcRef.current]
      const newKey = keyRef.current++
      nextSrcRef.current = (nextSrcRef.current + 1) % srcs.length

      // Preload the image after the one we just queued, so it's ready before it appears
      setPreloadSrc(srcs[nextSrcRef.current])

      setDot(d => (d + 1) % 3)
      setCards(prev => [
        ...prev.map(c => ({ ...c, offset: c.offset - 1 })),
        { key: newKey, src: newSrc, offset: 2 },
      ])
      setTimeout(
        () => setCards(prev => prev.filter(c => c.offset >= -2)),
        TRANSITION_MS + 50
      )
    }, INTERVAL_MS)
    return () => clearInterval(t)
  }, [srcs])

  if (!cards.length) return null

  return (
    <section className="carousel">
      <Preload src={preloadSrc} />
      <div className="carousel-stage">
        {cards.map(card => (
          <div key={card.key} className="carousel-card" style={slideStyle(card.offset)}>
            <img src={card.src} alt="" className="carousel-card-img" />
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {[0, 1, 2].map(i => (
          <span key={i} className={`carousel-dot${i === dot ? ' carousel-dot--active' : ''}`} />
        ))}
      </div>
      <div className="carousel-footer">
        <Link to="/gallery" className="carousel-more-btn">See More</Link>
      </div>
    </section>
  )
}
