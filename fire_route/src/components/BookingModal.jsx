const PLATFORMS = [
  {
    name: 'Airbnb',
    href: '#',
    color: '#FF5A5F',
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .001C5.925.001 1 4.927 1 11.001c0 2.89 1.044 5.528 2.76 7.558L12 23l8.24-4.441A10.96 10.96 0 0 0 23 11.001C23 4.927 18.075.001 12 .001zm0 2a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm0 3c-1.38 0-2.5 1.12-2.5 2.5 0 .95.53 1.78 1.3 2.21L9 11.5c-.5 1 .13 2.5 1.5 2.5h3c1.37 0 2-1.5 1.5-2.5l-1.8-1.79c.77-.43 1.3-1.26 1.3-2.21C14.5 6.121 13.38 5.001 12 5.001zm0 2a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1z"/>
      </svg>
    ),
  },
  {
    name: 'VRBO',
    href: '#',
    color: '#3D6AFF',
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22" fill="none" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    name: 'Booking.com',
    href: '#',
    color: '#003B95',
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" rx="1.5"/>
        <rect x="13" y="3" width="8" height="8" rx="1.5"/>
        <rect x="3" y="13" width="8" height="8" rx="1.5"/>
        <rect x="13" y="13" width="8" height="8" rx="1.5"/>
      </svg>
    ),
  },
  {
    name: 'Direct',
    href: '#',
    color: '#581e85',
    logo: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
]

export default function BookingModal({ open, onClose }) {
  if (!open) return null

  return (
    <>
      <div className="booking-overlay" onClick={onClose} />
      <div className="booking-modal" role="dialog" aria-modal="true" aria-label="Book your stay">
        <button className="booking-close" onClick={onClose} aria-label="Close">✕</button>
        <h2 className="booking-title">Book Your Stay</h2>
        <p className="booking-subtitle">72 Fire Rte 98 · Trent Lakes, ON</p>
        <div className="booking-grid">
          {PLATFORMS.map(({ name, href, color, logo }) => (
            <a
              key={name}
              href={href}
              className="booking-card"
              style={{ '--platform-color': color }}
              target="_blank"
              rel="noreferrer"
            >
              <span className="booking-card-logo">{logo}</span>
              <span className="booking-card-name">{name}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
