import { useState } from 'react'
import { Link } from 'react-router-dom'
import BookingModal from '../components/BookingModal'
import Carousel from '../components/Carousel'
import VideoPlayer from '../components/VideoPlayer'
import './Home.css'

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <div className="layout-wrap">
      <section id="center">
        <div className="hero">
          {/* <img src={heroImg} className="base" width="170" height="179" alt="" /> */}
          {/* <img src={reactLogo} className="framework" alt="React logo" /> */}
          {/* <img src={viteLogo} className="vite" alt="Vite logo" /> */}
        </div>
        <div>
          <h1>La Picholine - Vacation Rental</h1>
          <p>Located on the northern shores of Pigeon Lake, Trent Lakes, ON.</p>
        </div>
      </section>

      {/* <div className="ticks"></div> */}

      <div className="home-book-cta">
        <button className="home-book-btn" onClick={() => setBookingOpen(true)}>
          Book Your Stay
        </button>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />

      <section id="property-video">
        <h2>Property Video</h2>
        <VideoPlayer />
        <div className="home-book-cta">
          <Link className="home-book-btn" to="/iguide">
            View 3D Tour
          </Link>
        </div>
      </section>

      <Carousel />

      <section id="next-steps">
        {/* <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank" rel="noreferrer">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" rel="noreferrer">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div> */}
        <div id="booking">
          {/* <svg className="icon" role="presentation" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg> */}
          <h2>Book Your Stay</h2>
          <p>Book directly or reach out to us</p>
          <ul>
            <li>
              <a href="https://www.cottagesincanada.com/42737" target="_blank" rel="noreferrer">
                Book Now
              </a>
            </li>
            <li>
              <a href="mailto:kawarthawaterfrontcottage@gmail.com">
                Email
              </a>
            </li>
            <li>
              <a href="tel:+16472868630">
                Call
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section id="contact">
        <h2>Contact Us</h2>
        <p>Reach out or follow us for updates and availability.</p>
        <div className="contact-links">
          <a
            href="https://www.instagram.com/kawarthawaterfrontcottage/"
            target="_blank"
            rel="noreferrer"
            className="contact-link"
          >
            <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
            @kawarthawaterfrontcottage
          </a>
        </div>
      </section>

      {/* <div className="ticks"></div> */}
      {/* <section id="spacer"></section> */}
    </div>
  )
}
