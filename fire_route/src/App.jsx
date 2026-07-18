import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import IGuide from './pages/IGuide'
import Gallery from './pages/Gallery'
import Cottage from './pages/Cottage'
import Activities from './pages/Activities'
import './App.css'

const BG_SVG_SRC = `${import.meta.env.BASE_URL}backgrounds/stacked-waves-haikei.svg`

export default function App() {
  return (
    <>
      <img className="bg-svg" src={BG_SVG_SRC} alt="" aria-hidden="true" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/iguide" element={<IGuide />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/cottage" element={<Cottage />} />
        <Route path="/activities" element={<Activities />} />
      </Routes>
    </>
  )
}
