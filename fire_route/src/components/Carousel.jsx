import { useState, useEffect, useRef, useCallback } from 'react'
import './Carousel.css'

const REVIEWS_JSON = `${import.meta.env.BASE_URL}reviews.json`
const INTERVAL_MS = 6000
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

function mod(n, m) {
  return ((n % m) + m) % m
}

function Stars({ rating }) {
  const filled = Math.round(rating || 0)
  return (
    <div className="carousel-card-rating" aria-label={`${rating} out of 5 stars`}>
      <span className="carousel-card-rating-number">{rating?.toFixed(1)}</span>
      <div className="carousel-card-stars">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < filled ? 'star star--filled' : 'star'}>★</span>
        ))}
      </div>
    </div>
  )
}

export default function Carousel() {
  const [reviews, setReviews] = useState([])
  const [cards, setCards] = useState([])
  const [dot, setDot] = useState(0)
  const [paused, setPaused] = useState(false)
  const [expandedKey, setExpandedKey] = useState(null)
  const keyRef = useRef(0)
  const centerIndexRef = useRef(0)
  const directionRef = useRef(1)
  const animatingRef = useRef(false)

  useEffect(() => {
    fetch(REVIEWS_JSON)
      .then(r => r.json())
      .then(data => setReviews(data.reviews ?? []))
  }, [])

  useEffect(() => {
    if (!reviews.length) return
    centerIndexRef.current = 2 % reviews.length
    setCards(
      [-2, -1, 0, 1, 2].map((offset, i) => ({
        key: keyRef.current++,
        review: reviews[i % reviews.length],
        offset,
      }))
    )
  }, [reviews])

  // Shifts every card by one slot in `dir` (1 = forward, -1 = backward) and
  // brings in the next review at the far edge on that side.
  const step = useCallback((dir) => {
    if (!reviews.length) return
    const n = reviews.length
    const enteringOffset = dir * 2
    const enteringIndex = mod(centerIndexRef.current + dir + enteringOffset, n)
    const newReview = reviews[enteringIndex]
    const newKey = keyRef.current++

    animatingRef.current = true
    centerIndexRef.current = mod(centerIndexRef.current + dir, n)
    setDot(d => mod(d + dir, 3))
    setCards(prev => [
      ...prev.map(c => ({ ...c, offset: c.offset - dir })),
      { key: newKey, review: newReview, offset: enteringOffset },
    ])
    setTimeout(() => {
      setCards(prev => prev.filter(c => Math.abs(c.offset) <= 2))
      animatingRef.current = false
    }, TRANSITION_MS + 50)
  }, [reviews])

  useEffect(() => {
    if (!reviews.length || paused) return
    const t = setInterval(() => step(directionRef.current), INTERVAL_MS)
    return () => clearInterval(t)
  }, [reviews, paused, step])

  function handleCardClick(card) {
    if (animatingRef.current) return

    if (card.offset === 0) {
      const willExpand = expandedKey !== card.key
      setExpandedKey(willExpand ? card.key : null)
      setPaused(willExpand)
      return
    }

    setExpandedKey(null)
    const dir = card.offset > 0 ? 1 : -1
    directionRef.current = dir
    const stepsToGo = Math.abs(card.offset)
    setPaused(true)

    let done = 0
    const runStep = () => {
      step(dir)
      done++
      if (done < stepsToGo) {
        setTimeout(runStep, TRANSITION_MS + 50)
      } else {
        setTimeout(() => setPaused(false), TRANSITION_MS + 50)
      }
    }
    runStep()
  }

  if (!cards.length) return null

  return (
    <section className="carousel">
      <h2>What Our Guests Say</h2>
      <div className="carousel-stage">
        {cards.map(card => {
          const expanded = card.key === expandedKey
          return (
            <div
              key={card.key}
              className={`carousel-card${expanded ? ' carousel-card--expanded' : ''}`}
              style={slideStyle(card.offset)}
              onClick={() => handleCardClick(card)}
            >
              <Stars rating={card.review.rating} />
              <p className={`carousel-card-text${expanded ? ' carousel-card-text--expanded' : ''}`}>
                {card.review.text}
              </p>
              <p className="carousel-card-author">{card.review.author}</p>
            </div>
          )
        })}
      </div>
      <div className="carousel-dots">
        {[0, 1, 2].map(i => (
          <span key={i} className={`carousel-dot${i === dot ? ' carousel-dot--active' : ''}`} />
        ))}
      </div>
    </section>
  )
}
