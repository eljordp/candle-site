import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay },
  }),
}

export const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
}

export function useCursorGlow(ref, color = '253, 164, 175') {
  const [pos, setPos] = useState({ x: 0, y: 0, visible: false })

  const handleMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    })
  }, [ref])

  const handleLeave = useCallback(() => {
    setPos((p) => ({ ...p, visible: false }))
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [ref, handleMove, handleLeave])

  return pos
}

export function CandleVisual({ candle, size = 'md', animate = true }) {
  const sizes = {
    sm: { jar: 'w-28 h-32 md:w-32 md:h-36', flame: '-top-8', text: 'text-[10px] md:text-[11px]', brand: 'text-[8px]', weight: 'text-[7px]' },
    md: { jar: 'w-36 h-44 md:w-44 md:h-52', flame: '-top-10', text: 'text-[13px]', brand: 'text-[8px]', weight: 'text-[8px]' },
  }
  const s = sizes[size]

  return (
    <div className="relative">
      <motion.div
        className={`absolute ${s.flame} left-1/2 -translate-x-1/2`}
        animate={animate ? { opacity: [0.6, 1, 0.6] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-2.5 h-6 bg-gradient-to-t from-amber-500 via-orange-300 to-yellow-100 rounded-full blur-[1px]" />
        <motion.div
          className="absolute inset-0 w-3 h-7 bg-gradient-to-t from-amber-500/40 to-transparent rounded-full blur-md"
          animate={animate ? { scaleY: [1, 1.2, 1] } : {}}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      </motion.div>
      <div className="w-[1px] h-4 bg-stone/50 mx-auto" />
      <div
        className={`${s.jar} rounded-sm border border-white/10 flex flex-col items-center justify-center`}
        style={{ backgroundColor: candle.labelBg }}
      >
        <span className={`font-sans ${s.brand} tracking-[0.4em] text-white/30 mb-4`}>LUMIERE</span>
        <div className="w-10 h-[0.5px] bg-white/15 mb-4" />
        <span className={`font-sans ${s.text} tracking-[0.3em] text-white/85 font-light`}>{candle.name}</span>
        <div className="w-10 h-[0.5px] bg-white/15 mt-4" />
        <span className={`font-sans ${s.weight} tracking-[0.3em] text-white/25 mt-4`}>{candle.size}</span>
      </div>
    </div>
  )
}

export function ScentJourney({ candle }) {
  const layers = [
    { label: 'Top', notes: candle.top, time: '0\u201330 min', opacity: 'text-white/90' },
    { label: 'Heart', notes: candle.heart, time: '30 min\u20132 hr', opacity: 'text-white/70' },
    { label: 'Base', notes: candle.base, time: '2 hr+', opacity: 'text-white/50' },
  ]

  return (
    <motion.div
      className="mt-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/30 mb-6">
        Scent Journey
      </motion.p>
      <div className="space-y-0">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.label}
            variants={fadeUp}
            custom={i * 0.1}
            className="flex items-start gap-6 py-4 border-t border-white/5"
          >
            <div className="w-16 shrink-0">
              <p className={`font-sans text-[11px] tracking-[0.15em] uppercase ${layer.opacity}`}>{layer.label}</p>
              <p className="font-sans text-[9px] text-white/20 mt-1">{layer.time}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {layer.notes.map((note) => (
                <span
                  key={note}
                  className="font-sans text-[11px] text-white/60 border border-white/10 px-3 py-1.5 hover:border-white/25 transition-colors duration-300"
                >
                  {note}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div variants={fadeUp} className="mt-8 flex items-center gap-4">
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/25">Intensity</p>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((level) => (
            <motion.div
              key={level}
              className="w-6 h-1.5 rounded-full"
              style={{
                backgroundColor: level <= candle.intensity ? `rgba(${candle.glowColor}, 0.6)` : 'rgba(255,255,255,0.08)',
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + level * 0.1, duration: 0.4 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Nav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (v) => setScrolled(v > 80))
    return unsubscribe
  }, [scrollY])

  const navBg = useTransform(
    scrollY,
    [0, 100],
    isHome ? ['rgba(250,250,248,0)', 'rgba(250,250,248,0.95)'] : ['rgba(250,250,248,0.95)', 'rgba(250,250,248,0.95)']
  )
  const borderOp = useTransform(scrollY, [0, 100], isHome ? [0, 0.08] : [0.08, 0.08])

  const light = !isHome || scrolled

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{ backgroundColor: navBg, borderBottom: useTransform(borderOp, (v) => `1px solid rgba(26,26,26,${v})`) }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-14 md:h-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Link
            to="/"
            className={`font-sans text-[13px] md:text-[14px] tracking-[0.3em] font-medium transition-colors duration-500 ${light ? 'text-charcoal' : 'text-white'}`}
          >
            LUMIERE
          </Link>
        </motion.div>
        <motion.div
          className={`hidden md:flex items-center gap-10 font-sans text-[11px] tracking-[0.15em] uppercase transition-colors duration-500 ${light ? 'text-stone' : 'text-white/70'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Link to="/#collection" className={`transition-colors duration-500 ${light ? 'hover:text-charcoal' : 'hover:text-white'}`}>Collection</Link>
          <Link to="/#about" className={`transition-colors duration-500 ${light ? 'hover:text-charcoal' : 'hover:text-white'}`}>About</Link>
          <Link to="/bundle" className={`transition-colors duration-500 ${light ? 'hover:text-charcoal' : 'hover:text-white'}`}>The Ritual</Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link
            to="/#collection"
            className={`font-sans text-[10px] tracking-[0.2em] uppercase transition-colors duration-500 ${light ? 'text-charcoal hover:text-stone' : 'text-white/80 hover:text-white'}`}
          >
            Shop
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export function Footer() {
  return (
    <footer className="py-14 md:py-20 px-6 md:px-12 bg-charcoal border-t border-white/5">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-sans text-[12px] tracking-[0.3em] text-white/40 block mb-4">LUMIERE</Link>
            <p className="font-sans text-[12px] text-white/20 leading-relaxed font-light max-w-[200px]">
              Iconic fragrances, hand-poured in small batches.
            </p>
          </div>
          <div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">Shop</p>
            <div className="flex flex-col gap-2.5">
              <Link to="/sauvage" className="font-sans text-[12px] text-white/20 hover:text-white/50 transition-colors font-light">Sauvage</Link>
              <Link to="/rouge" className="font-sans text-[12px] text-white/20 hover:text-white/50 transition-colors font-light">Rouge</Link>
              <Link to="/guilty" className="font-sans text-[12px] text-white/20 hover:text-white/50 transition-colors font-light">Guilty</Link>
              <Link to="/bundle" className="font-sans text-[12px] text-white/20 hover:text-white/50 transition-colors font-light">The Ritual</Link>
            </div>
          </div>
          <div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">Info</p>
            <div className="flex flex-col gap-2.5">
              <Link to="/#about" className="font-sans text-[12px] text-white/20 hover:text-white/50 transition-colors font-light">About</Link>
              <span className="font-sans text-[12px] text-white/20 font-light">Shipping & Returns</span>
              <span className="font-sans text-[12px] text-white/20 font-light">FAQ</span>
              <Link to="/#contact" className="font-sans text-[12px] text-white/20 hover:text-white/50 transition-colors font-light">Contact</Link>
            </div>
          </div>
          <div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">Follow</p>
            <div className="flex flex-col gap-2.5">
              <span className="font-sans text-[12px] text-white/20 hover:text-white/50 transition-colors font-light cursor-pointer">Instagram</span>
              <span className="font-sans text-[12px] text-white/20 hover:text-white/50 transition-colors font-light cursor-pointer">TikTok</span>
              <span className="font-sans text-[12px] text-white/20 hover:text-white/50 transition-colors font-light cursor-pointer">Pinterest</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[10px] text-white/15">&copy; {new Date().getFullYear()} Lumiere. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="font-sans text-[10px] text-white/15">Privacy Policy</span>
            <span className="font-sans text-[10px] text-white/15">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
