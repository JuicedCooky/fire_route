import { useState } from 'react'

const IMAGES = [
  { id: 1,  src: 'https://picsum.photos/seed/frt-ext1/800/600',  alt: 'Front of property',   tags: ['Exterior'] },
  { id: 2,  src: 'https://picsum.photos/seed/frt-lake1/800/600', alt: 'Pigeon Lake view',     tags: ['Lake'] },
  { id: 3,  src: 'https://picsum.photos/seed/frt-liv1/800/600',  alt: 'Living room',          tags: ['Interior', 'Living Room'] },
  { id: 4,  src: 'https://picsum.photos/seed/frt-kit1/800/600',  alt: 'Kitchen',              tags: ['Interior', 'Kitchen'] },
  { id: 5,  src: 'https://picsum.photos/seed/frt-bed1/800/600',  alt: 'Master bedroom',       tags: ['Interior', 'Bedroom'] },
  { id: 6,  src: 'https://picsum.photos/seed/frt-lake2/800/600', alt: 'Sunset on the lake',   tags: ['Lake'] },
  { id: 7,  src: 'https://picsum.photos/seed/frt-ext2/800/600',  alt: 'Backyard deck',        tags: ['Exterior'] },
  { id: 8,  src: 'https://picsum.photos/seed/frt-bed2/800/600',  alt: 'Guest bedroom',        tags: ['Interior', 'Bedroom'] },
  { id: 9,  src: 'https://picsum.photos/seed/frt-kit2/800/600',  alt: 'Kitchen island',       tags: ['Interior', 'Kitchen'] },
  { id: 10, src: 'https://picsum.photos/seed/frt-lake3/800/600', alt: 'Dock at dusk',         tags: ['Lake'] },
  { id: 11, src: 'https://picsum.photos/seed/frt-ext3/800/600',  alt: 'Aerial view',          tags: ['Exterior'] },
  { id: 12, src: 'https://picsum.photos/seed/frt-liv2/800/600',  alt: 'Dining area',          tags: ['Interior', 'Living Room'] },
]

const ALL_TAGS = ['All', ...Array.from(new Set(IMAGES.flatMap((img) => img.tags)))]

export default function Gallery() {
  const [active, setActive] = useState('All')

  const visible = active === 'All' ? IMAGES : IMAGES.filter((img) => img.tags.includes(active))

  return (
    <div className="layout-wrap gallery-page">
      <h1 className="gallery-heading">Photo Gallery</h1>

      <div className="gallery-filters">
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            className={`filter-btn${active === tag ? ' filter-btn--active' : ''}`}
            onClick={() => setActive(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {visible.map((img) => (
          <div key={img.id} className="gallery-item">
            <img src={img.src} alt={img.alt} className="gallery-img" loading="lazy" />
            <div className="gallery-tags">
              {img.tags.map((t) => (
                <span key={t} className="gallery-tag" onClick={() => setActive(t)}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
