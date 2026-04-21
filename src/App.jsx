import { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const candles = [
  {
    id: 1,
    name: 'SAUVAGE',
    subtitle: 'Dior Sauvage',
    price: 48,
    size: '240g',
    notes: ['Bergamot', 'Ambroxan', 'Vanilla'],
    description: 'Raw, magnetic, untamed. Calabrian bergamot settles into a warm, woody embrace.',
    bg: '#0F1724',
    labelBg: '#1a2744',
  },
  {
    id: 2,
    name: 'ROUGE',
    subtitle: 'Baccarat Rouge 540',
    price: 58,
    size: '240g',
    notes: ['Saffron', 'Jasmine', 'Ambergris', 'Cedar'],
    description: 'Liquid crystal. Saffron and jasmine dissolve into luminous amber that lingers for hours.',
    bg: '#2A1019',
    labelBg: '#3d1826',
  },
  {
    id: 3,
    name: 'GUILTY',
    subtitle: 'Gucci Guilty',
    price: 48,
    size: '240g',
    notes: ['Mandarin', 'Lilac', 'Patchouli'],
    description: 'Unapologetic warmth. Italian mandarin gives way to a bold, impossibly smooth patchouli.',
    bg: '#1A1714',
    labelBg: '#2d2820',
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
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

function Nav() {
  const { scrollY } = useScroll()
  const navBg = useTransform(scrollY, [0, 100], ['rgba(250,248,245,0)', 'rgba(250,248,245,0.95)'])
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
    <motion.section
      className="h-screen flex flex-col items-center justify-center px-6 relative"
      style={{ opacity }}
    >
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
    <motion.div
      className="group cursor-pointer"
      variants={fadeUp}
      custom={index * 0.1}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Visual */}
      <div className="relative aspect-[3/4] mb-6 overflow-hidden" style={{ backgroundColor: candle.bg }}>
        {/* Ambient glow */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: hovered ? 0.15 : 0.08 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-amber-200 blur-[80px]" />
        </motion.div>

        {/* Candle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            animate={{ y: hovered ? -8 : 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Flame */}
            <motion.div
              className="absolute -top-8 left-1/2 -translate-x-1/2"
              animate={{
                opacity: hovered ? 1 : 0.4,
                scale: hovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-2 h-5 bg-gradient-to-t from-amber-500 via-orange-300 to-yellow-100 rounded-full blur-[1px]" />
              <motion.div
                className="absolute inset-0 w-2 h-5 bg-gradient-to-t from-amber-500/50 via-orange-300/30 to-transparent rounded-full blur-sm"
                animate={{ scaleY: [1, 1.15, 1], scaleX: [1, 0.9, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Wick */}
            <div className="w-[1px] h-3 bg-stone/60 mx-auto" />

            {/* Jar */}
            <div
              className="w-28 h-32 md:w-32 md:h-36 rounded-sm border border-white/10 flex flex-col items-center justify-center"
              style={{ backgroundColor: candle.labelBg }}
            >
              <span className="font-sans text-[8px] tracking-[0.4em] text-white/30 mb-3">LUMIERE</span>
              <div className="w-8 h-[0.5px] bg-white/15 mb-3" />
              <span className="font-sans text-[10px] md:text-[11px] tracking-[0.25em] text-white/80 font-light">
                {candle.name}
              </span>
              <div className="w-8 h-[0.5px] bg-white/15 mt-3" />
              <span className="font-sans text-[7px] tracking-[0.3em] text-white/25 mt-3">{candle.size}</span>
            </div>
          </motion.div>
        </div>

        {/* Quick add on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <button className="w-full font-sans text-[10px] tracking-[0.2em] uppercase bg-white/10 backdrop-blur-sm text-white/80 py-3 border border-white/10 hover:bg-white/20 transition-colors">
                Add to Cart
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Info — minimal like Byredo */}
      <div className="text-center">
        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone/50 mb-1.5">
          {candle.subtitle}
        </p>
        <h3 className="font-sans text-[13px] tracking-[0.15em] text-charcoal mb-1.5 font-normal">
          {candle.name}
        </h3>
        <p className="font-sans text-[13px] text-stone/70">${candle.price}</p>
      </div>
    </motion.div>
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
          <motion.p
            className="font-sans text-[10px] tracking-[0.4em] uppercase text-stone/50 mb-4"
            variants={fadeUp}
          >
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

function ProductDetail() {
  const [activeCandle, setActiveCandle] = useState(candles[1])

  return (
    <section className="py-16 md:py-28 px-6 md:px-12 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <motion.div
            className="relative aspect-square flex items-center justify-center"
            style={{ backgroundColor: activeCandle.bg }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full bg-amber-200 blur-[100px] opacity-10"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative">
              <motion.div
                className="absolute -top-10 left-1/2 -translate-x-1/2"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2.5 h-6 bg-gradient-to-t from-amber-500 via-orange-300 to-yellow-100 rounded-full blur-[1px]" />
                <motion.div
                  className="absolute inset-0 w-3 h-7 bg-gradient-to-t from-amber-500/40 to-transparent rounded-full blur-md"
                  animate={{ scaleY: [1, 1.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              </motion.div>
              <div className="w-[1px] h-4 bg-stone/50 mx-auto" />
              <div
                className="w-36 h-44 md:w-44 md:h-52 rounded-sm border border-white/10 flex flex-col items-center justify-center"
                style={{ backgroundColor: activeCandle.labelBg }}
              >
                <span className="font-sans text-[8px] tracking-[0.4em] text-white/30 mb-4">LUMIERE</span>
                <div className="w-10 h-[0.5px] bg-white/15 mb-4" />
                <span className="font-sans text-[13px] tracking-[0.3em] text-white/85 font-light">{activeCandle.name}</span>
                <div className="w-10 h-[0.5px] bg-white/15 mt-4" />
                <span className="font-sans text-[8px] tracking-[0.3em] text-white/25 mt-4">{activeCandle.size}</span>
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-[0.35em] uppercase text-stone/50 mb-3">
              {activeCandle.subtitle}
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-light text-charcoal mb-4 tracking-tight">
              {activeCandle.name}
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sans text-[15px] text-charcoal mb-8">
              ${activeCandle.price}
            </motion.p>
            <motion.p variants={fadeUp} className="font-sans text-[14px] text-stone/70 leading-relaxed mb-8 max-w-sm font-light">
              {activeCandle.description}
            </motion.p>

            <motion.div variants={fadeUp} className="mb-8">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone/40 mb-3">Notes</p>
              <div className="flex gap-4">
                {activeCandle.notes.map((note) => (
                  <span key={note} className="font-sans text-[12px] text-charcoal/70 border border-charcoal/10 px-4 py-2">
                    {note}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-3 mb-10">
              {candles.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCandle(c)}
                  className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    activeCandle.id === c.id ? 'border-charcoal scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c.bg }}
                />
              ))}
            </motion.div>

            <motion.button
              variants={fadeUp}
              className="font-sans text-[11px] tracking-[0.2em] uppercase bg-charcoal text-cream px-12 py-4 hover:bg-charcoal/80 transition-colors duration-500"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add to Cart — ${activeCandle.price}
            </motion.button>
          </motion.div>
        </div>
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
    <section className="py-20 md:py-28 px-6 bg-cream border-t border-charcoal/5">
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
    <section id="about" className="py-24 md:py-36 px-6 bg-white">
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
      <ProductDetail />
      <Details />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
