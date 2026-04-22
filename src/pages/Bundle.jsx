import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { candles } from '../data'
import { fadeUp, stagger, CandleVisual, useSplitTextReveal } from '../components'

export default function Bundle() {
  const [selected, setSelected] = useState([])
  const location = useLocation()
  const headlineRef = useRef(null)
  useSplitTextReveal(headlineRef, {
    by: 'chars',
    stagger: 0.04,
    duration: 1.1,
    delay: 0.15,
    ease: 'power4.out',
    scrollTrigger: false,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

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
    <div className="pt-14 md:pt-16">
      <section className="py-20 md:py-32 px-6 md:px-12 bg-cream">
        <div className="max-w-[1000px] mx-auto">
          {/* Breadcrumb */}
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/" className="font-sans text-[10px] tracking-[0.15em] uppercase text-stone/40 hover:text-stone transition-colors">
              Home
            </Link>
            <span className="font-sans text-[10px] text-stone/20 mx-2">/</span>
            <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-stone/60">
              The Ritual
            </span>
          </motion.div>

          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-[0.4em] uppercase text-stone/50 mb-4">
              Build Your Set
            </motion.p>
            <h1
              ref={headlineRef}
              className="font-serif text-4xl md:text-6xl font-light text-charcoal tracking-tight mb-4 overflow-hidden"
            >
              The Ritual
            </h1>
            <motion.p variants={fadeUp} className="font-sans text-[13px] text-stone/50 font-light max-w-md mx-auto leading-relaxed">
              Select your favourites. Get all three for $155 and save.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 mb-16"
            initial="hidden"
            animate="visible"
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
                  {/* Mood image background */}
                  <img
                    src={candle.moodImg}
                    alt={candle.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isSelected ? 'opacity-40' : 'opacity-25'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center relative z-10">
                    <CandleVisual candle={candle} size="sm" animate={isSelected} />
                  </div>

                  {/* Selected check */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center z-20"
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

                  <div className="absolute bottom-4 left-0 right-0 text-center z-10">
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/60">{candle.name}</p>
                    <p className="font-sans text-[11px] text-white/40 mt-1">${candle.price}</p>
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
                  className="w-full sm:w-auto font-sans text-[11px] tracking-[0.2em] uppercase bg-charcoal text-cream px-12 py-4 hover:bg-charcoal/80 transition-colors duration-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add {selected.length === 3 ? 'Collection' : 'Set'} to Cart — ${bundlePrice}
                </motion.button>
                <p className="mt-4 font-sans text-[10px] text-stone/30 font-light">
                  Free shipping on orders over $100 — 30-day returns
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
