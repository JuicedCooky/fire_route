import { useState, useEffect } from 'react'
import './Gallery.css'

const CDN_BASE = 'https://d13umf114s6tcz.cloudfront.net/images/72-Fire-Rte-98-1/'
const JSON_PATH = `${import.meta.env.BASE_URL}images/72-Fire-Rte-98-1.json`

export default function Gallery() {
  const [images, setImages] = useState([])
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch(JSON_PATH)
      .then(r => r.json())
      .then(data =>
        setImages(
          data.map((item, i) => ({
            id: i,
            src: `${CDN_BASE}${item.filename}`,
            alt: item.filename.replace(/^\d+-/, '').replace(/\.\w+$/, '').replace(/_/g, ' '),
            tags: [item.tag].flat().filter(Boolean),
          }))
        )
      )
  }, [])

  useEffect(() => {
    if (!selected) return
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  const allTags = Array.from(new Set(images.flatMap(img => img.tags)))
  const hasTags = allTags.length > 0
  const visible =
    !hasTags || active === 'All'
      ? images
      : images.filter(img => img.tags.includes(active))

  return (
    <div className="layout-wrap gallery-page">
      <h1 className="gallery-heading">Photo Gallery</h1>

      {hasTags && (
        <div className="gallery-filters">
          {['All', ...allTags].map(tag => (
            <button
              key={tag}
              className={`filter-btn${active === tag ? ' filter-btn--active' : ''}`}
              onClick={() => setActive(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="gallery-grid">
        {visible.map(img => (
          <div key={img.id} className="gallery-item" onClick={() => setSelected(img)}>
            <img src={img.src} alt={img.alt} className="gallery-img" loading="lazy" />
            {img.tags.length > 0 && (
              <div className="gallery-tags">
                {img.tags.map(t => (
                  <span key={t} className="gallery-tag" onClick={(e) => { e.stopPropagation(); setActive(t) }}>
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {selected && (
        <div className="lightbox-overlay" onClick={() => setSelected(null)}>
          <button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close">✕</button>
          <img
            src={selected.src}
            alt={selected.alt}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
