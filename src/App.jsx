import { Routes, Route } from 'react-router-dom'
import { Nav, Footer } from './components'
import Home from './pages/Home'
import Product from './pages/Product'
import Bundle from './pages/Bundle'

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bundle" element={<Bundle />} />
        <Route path="/:slug" element={<Product />} />
      </Routes>
      <Footer />
    </div>
  )
}
