import { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { candles } from '../data'
import { fadeUp, stagger } from '../components'

function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const imgScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1])

  return (
    <motion.section className="h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden" style={{ opacity }}>
      <motion.div className="absolute inset-0 z-0" style={{ scale: imgScale }}>
        <img src="/images/hero.jpg" alt="" className="w-full h-full object-cover" />
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
    <motion.div
      className="group block"
      variants={fadeUp}
      custom={index * 0.1}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <Link
        to={`/${candle.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative aspect-[3/4] mb-6 overflow-hidden" style={{ backgroundColor: candle.bg }}>
          {candle.tag && (
            <div className="absolute top-4 left-4 z-20">
              <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1.5 border border-white/10">
                {candle.tag}
              </span>
            </div>
          )}
          <motion.img
            src={candle.moodImg}
            alt={candle.name}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

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
      </Link>
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

        {/* Bundle CTA */}
        <motion.div
          className="text-center mt-16 md:mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="w-8 h-[1px] bg-charcoal/15 mx-auto mb-6" />
          <motion.p variants={fadeUp} className="font-sans text-[13px] text-stone/50 font-light mb-4">
            Get all three for $155
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              to="/bundle"
              className="inline-block font-sans text-[11px] tracking-[0.2em] uppercase bg-charcoal text-cream px-10 py-3.5 hover:bg-charcoal/80 transition-colors duration-500"
            >
              Build Your Set
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="py-24 md:py-36 px-6 bg-cream">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          className="relative aspect-[4/3] md:aspect-[4/5] overflow-hidden"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img src="/images/lifestyle.jpg" alt="Hand-poured candle" className="w-full h-full object-cover" />
        </motion.div>
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

export default function Home() {
  return (
    <>
      <Hero />
      <Collection />
      <About />
      <Contact />
    </>
  )
}
