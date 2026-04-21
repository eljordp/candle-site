import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const candles = [
  {
    id: 1,
    name: 'SAUVAGE',
    subtitle: 'Dior Sauvage',
    price: 55,
    size: '14oz',
    tag: 'Bestseller',
    top: ['Calabrian Bergamot', 'Pink Pepper'],
    heart: ['Sichuan Pepper', 'Lavender', 'Geranium'],
    base: ['Ambroxan', 'Cedar', 'Vanilla'],
    notes: ['Bergamot', 'Ambroxan', 'Vanilla'],
    description: 'Raw, magnetic, untamed. Calabrian bergamot settles into a warm, woody embrace. For the one who walks into a room and changes it.',
    story: 'Inspired by the wide-open Sauvage desert at twilight — the air charged with wild herbs and heat rising off the rock. We captured that energy in a hand-poured soy blend that opens bright, then deepens into something you can\'t stop breathing in.',
    mood: 'Bold, fresh, magnetic',
    season: 'Spring / Summer',
    intensity: 4,
    bg: '#0F1724',
    labelBg: '#1a2744',
    glowColor: '147, 197, 253',
    moodImg: '/images/sauvage-mood.jpg',
  },
  {
    id: 2,
    name: 'ROUGE',
    subtitle: 'Baccarat Rouge 540',
    price: 55,
    size: '14oz',
    tag: 'Most Gifted',
    top: ['Saffron', 'Jasmine'],
    heart: ['Ambergris', 'Maison Cedar'],
    base: ['Fir Resin', 'Musk', 'Cashmeran'],
    notes: ['Saffron', 'Jasmine', 'Ambergris', 'Cedar'],
    description: 'Liquid crystal. Saffron and jasmine dissolve into luminous amber that lingers for hours — ethereal, addictive, unmistakable.',
    story: 'There\'s a reason people stop you to ask what you\'re burning. Rouge was built around the same molecular magic that made the original impossible to ignore — saffron cracking open, jasmine dissolving into a cloud of amber that stays in the room long after the flame goes out.',
    mood: 'Ethereal, warm, addictive',
    season: 'Fall / Winter',
    intensity: 5,
    bg: '#2A1019',
    labelBg: '#3d1826',
    glowColor: '253, 164, 175',
    moodImg: '/images/red-rose.jpg',
  },
  {
    id: 3,
    name: 'GUILTY',
    subtitle: 'Gucci Guilty',
    price: 55,
    size: '14oz',
    tag: 'New',
    top: ['Italian Mandarin', 'Pink Pepper'],
    heart: ['Lilac', 'Geranium', 'Orange Blossom'],
    base: ['Patchouli', 'Cedarwood', 'Amber'],
    notes: ['Mandarin', 'Lilac', 'Patchouli'],
    description: 'Unapologetic warmth. Italian mandarin gives way to a bold, impossibly smooth patchouli. For nights that don\'t end early.',
    story: 'Guilty is the one you light when the evening has no agenda. Italian mandarin cuts through with a citrus snap, then gives way to something deeper — lilac and orange blossom tangled with a patchouli so smooth it feels like velvet. This is the late-night candle.',
    mood: 'Sensual, daring, smooth',
    season: 'Year-round',
    intensity: 3,
    bg: '#1A1714',
    labelBg: '#2d2820',
    glowColor: '217, 194, 160',
    moodImg: '/images/guilty-mood.jpg',
  },
]

const productSpecs = [
  { label: 'Burn Time', value: '60+ hours' },
  { label: 'Wax', value: '100% natural soy' },
  { label: 'Wick', value: 'Cotton, lead-free' },
  { label: 'Made In', value: 'Small batch, hand-poured' },
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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (v) => setScrolled(v > 80))
    return unsubscribe
  }, [scrollY])

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
          className={`font-sans text-[13px] md:text-[14px] tracking-[0.3em] font-medium transition-colors duration-500 ${scrolled ? 'text-charcoal' : 'text-white'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          LUMIERE
        </motion.a>
        <motion.div
          className={`hidden md:flex items-center gap-10 font-sans text-[11px] tracking-[0.15em] uppercase transition-colors duration-500 ${scrolled ? 'text-stone' : 'text-white/70'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <a href="#collection" className={`transition-colors duration-500 ${scrolled ? 'hover:text-charcoal' : 'hover:text-white'}`}>Collection</a>
          <a href="#about" className={`transition-colors duration-500 ${scrolled ? 'hover:text-charcoal' : 'hover:text-white'}`}>About</a>
          <a href="#contact" className={`transition-colors duration-500 ${scrolled ? 'hover:text-charcoal' : 'hover:text-white'}`}>Contact</a>
        </motion.div>
        <motion.a
          href="#collection"
          className={`font-sans text-[10px] tracking-[0.2em] uppercase transition-colors duration-500 ${scrolled ? 'text-charcoal hover:text-stone' : 'text-white/80 hover:text-white'}`}
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
  const imgScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1])

  return (
    <motion.section className="h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden" style={{ opacity }}>
      {/* Background image */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: imgScale }}>
        <img
          src="/images/hero.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      </motion.div>

      <motion.div className="text-center relative z-10" style={{ y }}>
        <motion.div
          className="w-12 h-[1px] bg-white/30 mx-auto mb-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <motion.p
          className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-white/60 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Fragrance Candles
        </motion.p>
        <motion.h1
          className="font-serif text-[clamp(3rem,10vw,9rem)] font-light text-white leading-[0.85] tracking-[-0.02em] mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          LUMIERE
        </motion.h1>
        <motion.p
          className="font-sans text-[13px] md:text-[14px] text-white/50 max-w-sm mx-auto leading-relaxed font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          Iconic scents, reimagined for your space
        </motion.p>
        <motion.div
          className="w-12 h-[1px] bg-white/30 mx-auto mt-10"
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
        {/* Tag badge */}
        {candle.tag && (
          <div className="absolute top-4 left-4 z-20">
            <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1.5 border border-white/10">
              {candle.tag}
            </span>
          </div>
        )}
        {/* Mood image background */}
        <motion.img
          src={candle.moodImg}
          alt={candle.name}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Candle label overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            animate={{ y: hovered ? -8 : 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              className="w-28 h-32 md:w-32 md:h-36 rounded-sm border border-white/15 flex flex-col items-center justify-center backdrop-blur-sm"
              style={{ backgroundColor: `${candle.labelBg}cc` }}
            >
              <span className="font-sans text-[8px] tracking-[0.4em] text-white/30 mb-3">LUMIERE</span>
              <div className="w-8 h-[0.5px] bg-white/15 mb-3" />
              <span className="font-sans text-[10px] md:text-[11px] tracking-[0.25em] text-white/85 font-light">{candle.name}</span>
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
              <span className="block w-full font-sans text-[10px] tracking-[0.2em] uppercase text-center text-white/70 py-3">
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
          {/* Mood image */}
          <motion.div
            className={`relative overflow-hidden rounded-sm ${reversed ? 'md:order-2' : ''}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative aspect-[3/4]">
              <img
                src={candle.moodImg}
                alt={candle.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {candle.tag && (
                <div className="absolute top-5 left-5">
                  <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1.5 border border-white/10">
                    {candle.tag}
                  </span>
                </div>
              )}
            </div>
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
            <motion.p variants={fadeUp} className="font-sans text-[14px] text-white/50 leading-relaxed mb-4 max-w-sm font-light">
              {candle.description}
            </motion.p>
            <motion.p variants={fadeUp} className="font-sans text-[13px] text-white/35 leading-[1.8] mb-8 max-w-sm font-light">
              {candle.story}
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

            <ScentJourney candle={candle} />

            {/* Inline specs */}
            <motion.div variants={fadeUp} className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/5 pt-6">
              {productSpecs.map((spec) => (
                <div key={spec.label}>
                  <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/20">{spec.label}</p>
                  <p className="font-sans text-[12px] text-white/50 mt-1 font-light">{spec.value}</p>
                </div>
              ))}
            </motion.div>

            <motion.button
              variants={fadeUp}
              className="mt-10 w-full md:w-auto font-sans text-[11px] tracking-[0.2em] uppercase bg-white/10 text-white/80 px-12 py-4 border border-white/10 hover:bg-white/15 transition-all duration-500"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add to Cart — ${candle.price}
            </motion.button>
            <motion.p variants={fadeUp} className="mt-4 font-sans text-[10px] text-white/20 font-light">
              Free shipping on orders over $100 — 30-day returns
            </motion.p>
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
  const originalPrice = selectedCandles.reduce((sum, c) => sum + c.price, 0)
  const bundlePrice = selected.length === 3 ? 155 : originalPrice
  const hasDiscount = selected.length === 3

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
            Get all three for $155
          </motion.p>
        </motion.div>

        <motion.div
          className="flex gap-4 md:grid md:grid-cols-3 md:gap-10 mb-16 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory md:snap-none -mx-6 px-6 md:mx-0 md:px-0"
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
                className={`relative aspect-[3/4] min-w-[65vw] md:min-w-0 snap-center rounded-sm overflow-hidden transition-all duration-500 ${
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
                  <p className="font-sans text-[10px] md:text-[9px] tracking-[0.2em] uppercase text-white/50">{candle.name}</p>
                  <p className="font-sans text-[10px] text-white/35 mt-1">${candle.price}</p>
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
              <div className="flex items-center justify-center gap-3 md:gap-6 mb-6 flex-wrap">
                {selectedCandles.map((c, i) => (
                  <div key={c.id} className="flex items-center gap-3 md:gap-6">
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
                    Save ${originalPrice - 155}
                  </span>
                )}
              </div>
              <motion.button
                className="w-full md:w-auto font-sans text-[11px] tracking-[0.2em] uppercase bg-charcoal text-cream px-12 py-4 hover:bg-charcoal/80 transition-colors duration-500"
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

function About() {
  return (
    <section id="about" className="py-24 md:py-36 px-6 bg-cream">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Lifestyle image */}
        <motion.div
          className="relative aspect-[4/3] md:aspect-[4/5] overflow-hidden"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img
            src="/images/lifestyle.jpg"
            alt="Hand-poured candle"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          className="text-center md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-[0.4em] uppercase text-stone/50 mb-6">
            Our Philosophy
          </motion.p>
          <motion.div variants={fadeUp} className="w-8 h-[1px] bg-charcoal/15 mb-10" />
          <motion.p variants={fadeUp} className="font-sans text-[14px] text-stone/60 leading-[1.9] font-light mb-8">
            We believe the fragrances you love shouldn't disappear when you leave the room.
            Each candle is hand-poured in small batches using premium soy wax and cotton wicks.
          </motion.p>
          <motion.p variants={fadeUp} className="font-sans text-[14px] text-stone/60 leading-[1.9] font-light">
            No shortcuts. No synthetics. Just clean-burning, long-lasting luxury.
          </motion.p>
          <motion.div variants={fadeUp} className="w-8 h-[1px] bg-charcoal/15 mt-10" />
        </motion.div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-24 md:py-36 px-6 bg-charcoal relative overflow-hidden">
      {/* Smoke texture */}
      <div className="absolute inset-0 z-0">
        <img src="/images/smoke.jpg" alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-charcoal/80" />
      </div>
      <motion.div
        className="max-w-md mx-auto text-center relative z-10"
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
        <motion.form variants={fadeUp} onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-0">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 bg-transparent border border-white/15 sm:border-r-0 px-5 py-3.5 font-sans text-[12px] text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-colors"
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
    <footer className="py-14 md:py-20 px-6 md:px-12 bg-charcoal border-t border-white/5">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-sans text-[12px] tracking-[0.3em] text-white/40 block mb-4">LUMIERE</span>
            <p className="font-sans text-[12px] text-white/20 leading-relaxed font-light max-w-[200px]">
              Iconic fragrances, hand-poured in small batches.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">Shop</p>
            <div className="flex flex-col gap-2.5">
              <a href="#sauvage" className="font-sans text-[12px] text-white/20 hover:text-white/50 transition-colors font-light">Sauvage</a>
              <a href="#rouge" className="font-sans text-[12px] text-white/20 hover:text-white/50 transition-colors font-light">Rouge</a>
              <a href="#guilty" className="font-sans text-[12px] text-white/20 hover:text-white/50 transition-colors font-light">Guilty</a>
              <a href="#collection" className="font-sans text-[12px] text-white/20 hover:text-white/50 transition-colors font-light">The Collection</a>
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">Info</p>
            <div className="flex flex-col gap-2.5">
              <a href="#about" className="font-sans text-[12px] text-white/20 hover:text-white/50 transition-colors font-light">About</a>
              <span className="font-sans text-[12px] text-white/20 font-light">Shipping & Returns</span>
              <span className="font-sans text-[12px] text-white/20 font-light">FAQ</span>
              <a href="#contact" className="font-sans text-[12px] text-white/20 hover:text-white/50 transition-colors font-light">Contact</a>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">Follow</p>
            <div className="flex flex-col gap-2.5">
              <span className="font-sans text-[12px] text-white/20 hover:text-white/50 transition-colors font-light cursor-pointer">Instagram</span>
              <span className="font-sans text-[12px] text-white/20 hover:text-white/50 transition-colors font-light cursor-pointer">TikTok</span>
              <span className="font-sans text-[12px] text-white/20 hover:text-white/50 transition-colors font-light cursor-pointer">Pinterest</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
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
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
