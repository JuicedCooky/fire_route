import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Features', anchor: 'floating-boxes' },
  { label: 'Resources', anchor: 'next-steps' },
  { label: 'iGuide', to: '/iguide' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setSidebarOpen(false)
  }

  return (
    <>
      <nav className="navbar">
        <Link className="nav-logo" to="/">72 Fire Rte 98</Link>
        <ul className="nav-links">
          {NAV_ITEMS.map(({ label, to, anchor }) => (
            <li key={label}>
              {to ? (
                <NavLink to={to} end>{label}</NavLink>
              ) : (
                <a href={`#${anchor}`} onClick={(e) => { e.preventDefault(); scrollTo(anchor) }}>{label}</a>
              )}
            </li>
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
          {NAV_ITEMS.map(({ label, to, anchor }) => (
            <li key={label}>
              {to ? (
                <NavLink to={to} end onClick={() => setSidebarOpen(false)}>{label}</NavLink>
              ) : (
                <a href={`#${anchor}`} onClick={(e) => { e.preventDefault(); scrollTo(anchor) }}>{label}</a>
              )}
            </li>
          ))}
        </ul>
      </aside>
      <div
        className={`sidebar-overlay${sidebarOpen ? ' sidebar-overlay--visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />
    </>
  )
}
