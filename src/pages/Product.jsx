import { useRef, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { candles, productSpecs } from '../data'
import { fadeUp, stagger, useCursorGlow, ScentJourney, useSplitTextReveal, useMaskReveal } from '../components'

export default function Product() {
  const { slug } = useParams()
  const location = useLocation()
  const candle = candles.find((c) => c.slug === slug)
  const others = candles.filter((c) => c.slug !== slug)
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const headlineRef = useRef(null)
  const glow = useCursorGlow(sectionRef, candle?.glowColor)

  useMaskReveal(imageRef, { direction: 'up' })
  useSplitTextReveal(headlineRef, {
    by: 'chars',
    stagger: 0.035,
    duration: 1.1,
    delay: 0.2,
    ease: 'power4.out',
    scrollTrigger: false,
    deps: [slug],
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  if (!candle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream pt-16">
        <div className="text-center">
          <p className="font-serif text-4xl text-charcoal mb-4">Not Found</p>
          <Link to="/" className="font-sans text-[11px] tracking-[0.2em] uppercase text-stone hover:text-charcoal transition-colors">
            Back to Collection
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Product detail */}
      <section
        ref={sectionRef}
        className="relative overflow-hidden pt-14 md:pt-16"
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

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-24 relative z-20">
          {/* Breadcrumb */}
          <motion.div
            className="mb-8 md:mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/" className="font-sans text-[10px] tracking-[0.15em] uppercase text-white/25 hover:text-white/50 transition-colors">
              Home
            </Link>
            <span className="font-sans text-[10px] text-white/15 mx-2">/</span>
            <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-white/40">
              {candle.name}
            </span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
            {/* Mood image with candle overlay */}
            <div
              ref={imageRef}
              className="relative overflow-hidden rounded-sm"
            >
              <div className="relative aspect-[3/4]">
                <img
                  src={candle.productImg}
                  alt={candle.name}
                  className="w-full h-full object-cover"
                />
                {/* Warm ambient wash from glass */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center 55%, rgba(${candle.glowColor}, 0.12) 0%, transparent 65%)`,
                  }}
                />
                {candle.tag && (
                  <div className="absolute top-5 left-5 z-20">
                    <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-white/90 bg-black/30 backdrop-blur-sm px-3 py-1.5 border border-white/15">
                      {candle.tag}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-[0.35em] uppercase text-white/30 mb-3">
                {candle.subtitle}
              </motion.p>
              <h1
                key={candle.slug}
                ref={headlineRef}
                className="font-serif text-4xl md:text-6xl font-light text-white mb-3 tracking-tight overflow-hidden"
              >
                {candle.name}
              </h1>
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

      {/* You may also like */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-cream">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-[0.4em] uppercase text-stone/50 mb-4">
              You may also like
            </motion.p>
            <motion.div variants={fadeUp} className="w-8 h-[1px] bg-charcoal/15 mx-auto" />
          </motion.div>
          <div className="flex justify-center gap-8 md:gap-14">
            {others.map((other) => (
              <Link key={other.id} to={`/${other.slug}`} className="group block">
                <div className="flex flex-col items-center">
                  {/* Flame */}
                  <motion.div
                    className="mb-[-2px] z-10"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-2 h-5 bg-gradient-to-t from-amber-500 via-orange-300 to-yellow-100 rounded-full blur-[0.5px]" />
                  </motion.div>
                  {/* Wick */}
                  <div className="w-[1px] h-3 bg-stone/40 mb-[-1px] z-10" />
                  {/* Candle jar card — 14oz tumbler shape */}
                  <motion.div
                    className="relative w-40 h-44 md:w-52 md:h-56 overflow-hidden"
                    style={{
                      borderRadius: '30% 30% 6% 6% / 18% 18% 4% 4%',
                      backgroundColor: other.bg,
                    }}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <img
                      src={other.altImg}
                      alt={other.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                      <span className="font-sans text-[7px] tracking-[0.4em] text-white/30 mb-2">VELVET EMBER</span>
                      <div className="w-6 h-[0.5px] bg-white/15 mb-2" />
                      <span className="font-sans text-[10px] md:text-[11px] tracking-[0.25em] text-white/85 font-light">{other.name}</span>
                      <div className="w-6 h-[0.5px] bg-white/15 mt-2" />
                    </div>
                  </motion.div>
                </div>
                <div className="text-center mt-4">
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone/45 mb-1">{other.subtitle}</p>
                  <p className="font-sans text-[12px] text-stone/65">${other.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
