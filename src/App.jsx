import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const candles = [
  {
    id: 1,
    name: 'SAUVAGE',
    subtitle: 'Dior Sauvage',
    price: 48,
    size: '240g',
    top: ['Calabrian Bergamot', 'Pink Pepper'],
    heart: ['Sichuan Pepper', 'Lavender', 'Geranium'],
    base: ['Ambroxan', 'Cedar', 'Vanilla'],
    notes: ['Bergamot', 'Ambroxan', 'Vanilla'],
    description: 'Raw, magnetic, untamed. Calabrian bergamot settles into a warm, woody embrace. For the one who walks into a room and changes it.',
    mood: 'Bold, fresh, magnetic',
    season: 'Spring / Summer',
    intensity: 4,
    bg: '#0F1724',
    labelBg: '#1a2744',
    glowColor: '147, 197, 253',
  },
  {
    id: 2,
    name: 'ROUGE',
    subtitle: 'Baccarat Rouge 540',
    price: 58,
    size: '240g',
    top: ['Saffron', 'Jasmine'],
    heart: ['Ambergris', 'Maison Cedar'],
    base: ['Fir Resin', 'Musk', 'Cashmeran'],
    notes: ['Saffron', 'Jasmine', 'Ambergris', 'Cedar'],
    description: 'Liquid crystal. Saffron and jasmine dissolve into luminous amber that lingers for hours — ethereal, addictive, unmistakable.',
    mood: 'Ethereal, warm, addictive',
    season: 'Fall / Winter',
    intensity: 5,
    bg: '#2A1019',
    labelBg: '#3d1826',
    glowColor: '253, 164, 175',
  },
  {
    id: 3,
    name: 'GUILTY',
    subtitle: 'Gucci Guilty',
    price: 48,
    size: '240g',
    top: ['Italian Mandarin', 'Pink Pepper'],
    heart: ['Lilac', 'Geranium', 'Orange Blossom'],
    base: ['Patchouli', 'Cedarwood', 'Amber'],
    notes: ['Mandarin', 'Lilac', 'Patchouli'],
    description: 'Unapologetic warmth. Italian mandarin gives way to a bold, impossibly smooth patchouli. For nights that don\'t end early.',
    mood: 'Sensual, daring, smooth',
    season: 'Year-round',
    intensity: 3,
    bg: '#1A1714',
    labelBg: '#2d2820',
    glowColor: '217, 194, 160',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay },
  }),
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
}

// Cursor glow hook for dark sections
function useCursorGlow(ref, color = '253, 164, 175') {
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

function CursorGlow({ containerRef, color }) {
  const pos = useCursorGlow(containerRef, color)
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
      style={{ opacity: pos.visible ? 1 : 0 }}
    >
      <div
        className="absolute w-[400px] h-[400px] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          left: pos.x,
          top: pos.y,
          background: `radial-gradient(circle, rgba(${color}, 0.08) 0%, transparent 70%)`,
        }}
      />
    </div>
  )
}

// Candle visual component (reusable)
function CandleVisual({ candle, size = 'md', animate = true }) {
  const sizes = {
    sm: { jar: 'w-28 h-32 md:w-32 md:h-36', flame: '-top-8', wick: 'h-3', text: 'text-[10px] md:text-[11px]', brand: 'text-[8px]', weight: 'text-[7px]' },
    md: { jar: 'w-36 h-44 md:w-44 md:h-52', flame: '-top-10', wick: 'h-4', text: 'text-[13px]', brand: 'text-[8px]', weight: 'text-[8px]' },
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

function Nav() {
  const { scrollY } = useScroll()
  const navBg = useTransform(scrollY, [0, 100], ['rgba(250,250,248,0)', 'rgba(250,250,248,0.95)'])
  const borderOp = useTransform(scrollY, [0, 100], [0, 0.08])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{ backgroundColor: navBg, borderBottom: useTransform(borderOp, (v) => `1px solid rgba(26,26,26,${v})`) }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-14 md:h-16">
        <motion.a
          href="#"
          className="font-sans text-[13px] md:text-[14px] tracking-[0.3em] font-medium text-charcoal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          LUMIERE
        </motion.a>
        <motion.div
          className="hidden md:flex items-center gap-10 font-sans text-[11px] tracking-[0.15em] uppercase text-stone"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <a href="#collection" className="hover:text-charcoal transition-colors duration-500">Collection</a>
          <a href="#about" className="hover:text-charcoal transition-colors duration-500">About</a>
          <a href="#contact" className="hover:text-charcoal transition-colors duration-500">Contact</a>
        </motion.div>
        <motion.a
          href="#collection"
          className="font-sans text-[10px] tracking-[0.2em] uppercase text-charcoal hover:text-stone transition-colors duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Shop
        </motion.a>
      </div>
    </motion.nav>
  )
}

function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  return (
    <motion.section className="h-screen flex flex-col items-center justify-center px-6 relative" style={{ opacity }}>
      <motion.div className="text-center" style={{ y }}>
        <motion.div
          className="w-12 h-[1px] bg-charcoal/20 mx-auto mb-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <motion.p
          className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-stone/70 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Fragrance Candles
        </motion.p>
        <motion.h1
          className="font-serif text-[clamp(3rem,10vw,9rem)] font-light text-charcoal leading-[0.85] tracking-[-0.02em] mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          LUMIERE
        </motion.h1>
        <motion.p
          className="font-sans text-[13px] md:text-[14px] text-stone/60 max-w-sm mx-auto leading-relaxed font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          Iconic scents, reimagined for your space
        </motion.p>
        <motion.div
          className="w-12 h-[1px] bg-charcoal/20 mx-auto mt-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </motion.div>
    </motion.section>
  )
}

function ProductCard({ candle, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={`#${candle.name.toLowerCase()}`}
      className="group block"
      variants={fadeUp}
      custom={index * 0.1}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] mb-6 overflow-hidden" style={{ backgroundColor: candle.bg }}>
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: hovered ? 0.15 : 0.08 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-amber-200 blur-[80px]" />
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            animate={{ y: hovered ? -8 : 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              className="absolute -top-8 left-1/2 -translate-x-1/2"
              animate={{ opacity: hovered ? 1 : 0.4, scale: hovered ? 1 : 0.8 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-2 h-5 bg-gradient-to-t from-amber-500 via-orange-300 to-yellow-100 rounded-full blur-[1px]" />
              <motion.div
                className="absolute inset-0 w-2 h-5 bg-gradient-to-t from-amber-500/50 via-orange-300/30 to-transparent rounded-full blur-sm"
                animate={{ scaleY: [1, 1.15, 1], scaleX: [1, 0.9, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
            <div className="w-[1px] h-3 bg-stone/60 mx-auto" />
            <div
              className="w-28 h-32 md:w-32 md:h-36 rounded-sm border border-white/10 flex flex-col items-center justify-center"
              style={{ backgroundColor: candle.labelBg }}
            >
              <span className="font-sans text-[8px] tracking-[0.4em] text-white/30 mb-3">LUMIERE</span>
              <div className="w-8 h-[0.5px] bg-white/15 mb-3" />
              <span className="font-sans text-[10px] md:text-[11px] tracking-[0.25em] text-white/80 font-light">{candle.name}</span>
              <div className="w-8 h-[0.5px] bg-white/15 mt-3" />
              <span className="font-sans text-[7px] tracking-[0.3em] text-white/25 mt-3">{candle.size}</span>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <span className="block w-full font-sans text-[10px] tracking-[0.2em] uppercase text-center text-white/60 py-3">
                View Details
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-center">
        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone/50 mb-1.5">{candle.subtitle}</p>
        <h3 className="font-sans text-[13px] tracking-[0.15em] text-charcoal mb-1.5 font-normal">{candle.name}</h3>
        <p className="font-sans text-[13px] text-stone/70">${candle.price}</p>
      </div>
    </motion.a>
  )
}

function Collection() {
  return (
    <section id="collection" className="py-24 md:py-36 px-6 md:px-12 bg-cream">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p className="font-sans text-[10px] tracking-[0.4em] uppercase text-stone/50 mb-4" variants={fadeUp}>
            The Collection
          </motion.p>
          <motion.div className="w-8 h-[1px] bg-charcoal/15 mx-auto" variants={fadeUp} />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {candles.map((candle, i) => (
            <ProductCard key={candle.id} candle={candle} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Scent Journey — visual top/heart/base breakdown
function ScentJourney({ candle }) {
  const layers = [
    { label: 'Top', notes: candle.top, time: '0–30 min', opacity: 'text-white/90' },
    { label: 'Heart', notes: candle.heart, time: '30 min–2 hr', opacity: 'text-white/70' },
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
      {/* Intensity bar */}
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

// Individual product detail section for each candle
function ProductSection({ candle, reversed = false }) {
  const sectionRef = useRef(null)
  const glow = useCursorGlow(sectionRef, candle.glowColor)

  return (
    <section
      id={candle.name.toLowerCase()}
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: candle.bg }}
    >
      {/* Cursor glow */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
        style={{ opacity: glow.visible ? 1 : 0 }}
      >
        <div
          className="absolute w-[500px] h-[500px] rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            left: glow.x,
            top: glow.y,
            background: `radial-gradient(circle, rgba(${candle.glowColor}, 0.06) 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-32 relative z-20">
        <div className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${reversed ? 'direction-rtl' : ''}`}>
          {/* Candle visual */}
          <motion.div
            className={`relative flex items-center justify-center py-16 ${reversed ? 'md:order-2' : ''}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full blur-[100px] opacity-10"
              style={{ backgroundColor: `rgb(${candle.glowColor})` }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <CandleVisual candle={candle} size="md" />
          </motion.div>

          {/* Details */}
          <motion.div
            className={reversed ? 'md:order-1' : ''}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-[0.35em] uppercase text-white/30 mb-3">
              {candle.subtitle}
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-6xl font-light text-white mb-3 tracking-tight">
              {candle.name}
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sans text-[15px] text-white/50 mb-8">
              ${candle.price} — {candle.size}
            </motion.p>
            <motion.p variants={fadeUp} className="font-sans text-[14px] text-white/50 leading-relaxed mb-6 max-w-sm font-light">
              {candle.description}
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-6 mb-6 text-[11px]">
              <div>
                <span className="font-sans text-white/25 tracking-[0.15em] uppercase">Mood</span>
                <p className="font-sans text-white/60 mt-1">{candle.mood}</p>
              </div>
              <div>
                <span className="font-sans text-white/25 tracking-[0.15em] uppercase">Season</span>
                <p className="font-sans text-white/60 mt-1">{candle.season}</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-6">
              {candle.notes.map((note) => (
                <span key={note} className="font-sans text-[11px] text-white/60 border border-white/10 px-4 py-2">
                  {note}
                </span>
              ))}
            </motion.div>

            <ScentJourney candle={candle} />

            <motion.button
              variants={fadeUp}
              className="mt-10 font-sans text-[11px] tracking-[0.2em] uppercase bg-white/10 text-white/80 px-12 py-4 border border-white/10 hover:bg-white/15 transition-all duration-500"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add to Cart — ${candle.price}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Bundle Builder
function BundleBuilder() {
  const [selected, setSelected] = useState([])
  const sectionRef = useRef(null)

  const toggleCandle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    )
  }

  const selectedCandles = candles.filter((c) => selected.includes(c.id))
  const bundlePrice = selected.length >= 2
    ? Math.round(selectedCandles.reduce((sum, c) => sum + c.price, 0) * 0.9)
    : selectedCandles.reduce((sum, c) => sum + c.price, 0)
  const originalPrice = selectedCandles.reduce((sum, c) => sum + c.price, 0)
  const hasDiscount = selected.length >= 2

  return (
    <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-cream border-t border-charcoal/5">
      <div className="max-w-[1000px] mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-[0.4em] uppercase text-stone/50 mb-4">
            Build Your Set
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-5xl font-light text-charcoal tracking-tight mb-4">
            The Ritual
          </motion.h2>
          <motion.p variants={fadeUp} className="font-sans text-[13px] text-stone/50 font-light">
            Pick 2 or more and save 10%
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-6 md:gap-10 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {candles.map((candle) => {
            const isSelected = selected.includes(candle.id)
            return (
              <motion.button
                key={candle.id}
                variants={fadeUp}
                onClick={() => toggleCandle(candle.id)}
                className={`relative aspect-[3/4] rounded-sm overflow-hidden transition-all duration-500 ${
                  isSelected ? 'ring-2 ring-charcoal ring-offset-4 ring-offset-cream' : 'hover:ring-1 hover:ring-charcoal/20 hover:ring-offset-4 hover:ring-offset-cream'
                }`}
                style={{ backgroundColor: candle.bg }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <CandleVisual candle={candle} size="sm" animate={isSelected} />
                </div>

                {/* Selected check */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/50">{candle.name}</p>
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Bundle summary */}
        <AnimatePresence mode="wait">
          {selected.length > 0 && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-center gap-6 mb-6">
                {selectedCandles.map((c, i) => (
                  <div key={c.id} className="flex items-center gap-6">
                    {i > 0 && <span className="font-sans text-stone/30">+</span>}
                    <div className="text-center">
                      <p className="font-sans text-[11px] tracking-[0.15em] text-charcoal">{c.name}</p>
                      <p className="font-sans text-[11px] text-stone/50">${c.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-3 mb-6">
                {hasDiscount && (
                  <span className="font-sans text-[14px] text-stone/40 line-through">${originalPrice}</span>
                )}
                <span className="font-serif text-2xl text-charcoal">${bundlePrice}</span>
                {hasDiscount && (
                  <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-green-700 bg-green-50 px-2 py-1">
                    Save 10%
                  </span>
                )}
              </div>
              <motion.button
                className="font-sans text-[11px] tracking-[0.2em] uppercase bg-charcoal text-cream px-12 py-4 hover:bg-charcoal/80 transition-colors duration-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add {selected.length === 3 ? 'Collection' : 'Set'} to Cart — ${bundlePrice}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function Details() {
  const items = [
    { label: 'Burn Time', value: '60+ hours' },
    { label: 'Wax', value: '100% natural soy' },
    { label: 'Wick', value: 'Cotton, lead-free' },
    { label: 'Made In', value: 'Small batch, hand-poured' },
  ]

  return (
    <section className="py-20 md:py-28 px-6 bg-white border-t border-charcoal/5">
      <motion.div
        className="max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        {items.map((item) => (
          <motion.div key={item.label} variants={fadeUp} className="text-center">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone/40 mb-2">{item.label}</p>
            <p className="font-sans text-[13px] text-charcoal font-light">{item.value}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="py-24 md:py-36 px-6 bg-cream">
      <motion.div
        className="max-w-lg mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="w-8 h-[1px] bg-charcoal/15 mx-auto mb-10" />
        <motion.p variants={fadeUp} className="font-sans text-[14px] text-stone/60 leading-[1.9] font-light mb-8">
          We believe the fragrances you love shouldn't disappear when you leave the room.
          Each candle is hand-poured in small batches using premium soy wax and cotton wicks.
        </motion.p>
        <motion.p variants={fadeUp} className="font-sans text-[14px] text-stone/60 leading-[1.9] font-light">
          No shortcuts. No synthetics. Just clean-burning, long-lasting luxury.
        </motion.p>
        <motion.div variants={fadeUp} className="w-8 h-[1px] bg-charcoal/15 mx-auto mt-10" />
      </motion.div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-24 md:py-36 px-6 bg-charcoal">
      <motion.div
        className="max-w-md mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-[0.4em] uppercase text-white/30 mb-6">
          Newsletter
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">
          Stay in the know
        </motion.h2>
        <motion.p variants={fadeUp} className="font-sans text-[13px] text-white/35 font-light mb-10">
          New scents, restocks, and limited drops.
        </motion.p>
        <motion.form variants={fadeUp} onSubmit={(e) => e.preventDefault()} className="flex gap-0">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 bg-transparent border border-white/15 border-r-0 px-5 py-3.5 font-sans text-[12px] text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-colors"
          />
          <motion.button
            type="submit"
            className="font-sans text-[10px] tracking-[0.2em] uppercase bg-white text-charcoal px-6 py-3.5 hover:bg-white/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Subscribe
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 px-6 bg-charcoal border-t border-white/5">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="font-sans text-[11px] tracking-[0.3em] text-white/25">LUMIERE</span>
        <p className="font-sans text-[11px] text-white/15">&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <Hero />
      <Collection />

      {/* Individual product sections */}
      {candles.map((candle, i) => (
        <ProductSection key={candle.id} candle={candle} reversed={i % 2 !== 0} />
      ))}

      <BundleBuilder />
      <Details />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
