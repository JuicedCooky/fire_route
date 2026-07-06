import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import IGuide from './pages/IGuide'
import Gallery from './pages/Gallery'
import './App.css'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/iguide" element={<IGuide />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </>
  )
}
