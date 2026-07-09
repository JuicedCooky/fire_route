import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import BookingModal from './BookingModal'

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Book', modal: true },
  { label: 'iGuide', to: '/iguide' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setSidebarOpen(false)
  }

  const openBooking = () => {
    setSidebarOpen(false)
    setBookingOpen(true)
  }

  const renderItem = ({ label, to, anchor, modal }) => {
    if (to) return <NavLink to={to} end onClick={() => setSidebarOpen(false)}>{label}</NavLink>
    if (modal) return <button onClick={openBooking}>{label}</button>
    return <a href={`#${anchor}`} onClick={(e) => { e.preventDefault(); scrollTo(anchor) }}>{label}</a>
  }

  return (
    <>
      <nav className="navbar">
        <Link className="nav-logo" to="/">72 Fire Rte 98</Link>
        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>{renderItem(item)}</li>
          ))}
        </ul>
      </nav>

      <button
        className={`menu-btn${scrolled ? ' menu-btn--visible' : ''}`}
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        <span /><span /><span />
      </button>

      <aside className={`sidebar${sidebarOpen ? ' sidebar--open' : ''}`}>
        <button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">✕</button>
        <Link className="sidebar-logo" to="/" onClick={() => setSidebarOpen(false)}>72 Fire Rte 98</Link>
        <ul className="sidebar-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>{renderItem(item)}</li>
          ))}
        </ul>
      </aside>
      <div
        className={`sidebar-overlay${sidebarOpen ? ' sidebar-overlay--visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
