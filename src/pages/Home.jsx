import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { candles } from '../data'
import { fadeUp, stagger, useSplitTextReveal, useMaskReveal } from '../components'

gsap.registerPlugin(ScrollTrigger)

function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const headlineRef = useRef(null)
  useSplitTextReveal(headlineRef, { stagger: 0.05, duration: 1.2, delay: 1.6, ease: 'power4.out', scrollTrigger: false })

  return (
    <motion.section
      className="h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-black"
      style={{ opacity }}
    >
      {/* Ambient flame glow filling the space */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 170, 80, 0.10) 0%, rgba(255, 140, 50, 0.05) 20%, transparent 60%)',
        }}
        animate={{ opacity: [0.6, 1, 0.8, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div className="text-center relative z-10 flex flex-col items-center" style={{ y }}>
        {/* Flame — 4K video loop */}
        <motion.div
          className="relative mb-8 md:mb-10 w-40 h-56 md:w-56 md:h-80"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <video
            poster="/video/flame-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ mixBlendMode: 'screen' }}
          >
            <source src="/video/flame-1440.webm" type="video/webm" />
            <source src="/video/flame-1440.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <motion.div
          className="w-12 h-[1px] bg-white/20 mx-auto mb-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <motion.p
          className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-white/50 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          Fragrance Candles
        </motion.p>
        <h1
          ref={headlineRef}
          className="font-serif text-[clamp(2.25rem,11vw,9rem)] font-light text-white leading-[0.9] tracking-[-0.02em] mb-10 md:mb-8 overflow-hidden whitespace-nowrap"
          style={{ fontFamily: "'Instrument Serif', 'Fraunces', Georgia, serif" }}
        >
          VELVET EMBER
        </h1>
        <motion.p
          className="font-sans text-[13px] md:text-[14px] text-white/40 max-w-sm mx-auto leading-relaxed font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          Iconic scents, reimagined for your space
        </motion.p>
        <motion.div
          className="w-12 h-[1px] bg-white/20 mx-auto mt-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 2.2, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.8 }}
      >
        <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-white/30">Scroll</span>
        <div className="animate-gentle-bounce">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>
    </motion.section>
  )
}

function Marquee() {
  const items = ['SAUVAGE', 'ROUGE', 'GUILTY', 'HAND-POURED', 'SOY WAX', 'SMALL BATCH', 'LUXURY SCENTS', 'COTTON WICK']
  const repeated = [...items, ...items]

  return (
    <div className="py-6 md:py-8 bg-charcoal overflow-hidden border-y border-white/5">
      <div className="animate-marquee flex items-center whitespace-nowrap" style={{ width: 'max-content' }}>
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-white/20 mx-6 md:mx-10">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-gold/30" />
          </span>
        ))}
      </div>
    </div>
  )
}

function ProductCard({ candle, index }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)

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
        ref={cardRef}
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

          {/* Mood layer — lifestyle scenery beneath, revealed on hover */}
          <motion.img
            src={candle.moodImg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.04 : 1.08 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {/* Product shot — hero state */}
          <motion.img
            src={candle.productImg}
            alt={candle.name}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 1.03 : 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {/* Warm glow — stronger on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-700 pointer-events-none z-[1]"
            style={{
              opacity: hovered ? 1 : 0.35,
              background: `radial-gradient(ellipse at center 60%, rgba(${candle.glowColor}, 0.18) 0%, transparent 65%)`,
            }}
          />

          {/* Darken overlay on hover so notes/mood text is legible */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-500 z-[2] pointer-events-none"
            style={{ opacity: hovered ? 1 : 0 }}
          />

          {/* Fragrance info — always visible on mobile, hover-only on desktop */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 z-10">
            <div className="flex flex-wrap gap-1.5 mb-2 md:mb-3">
              {candle.notes.slice(0, 4).map((note) => (
                <span key={note} className="font-sans text-[8px] md:text-[9px] text-white/70 border border-white/20 bg-black/30 backdrop-blur-sm px-1.5 md:px-2 py-0.5 md:py-1">
                  {note}
                </span>
              ))}
            </div>
            <p className="font-sans text-[8px] md:text-[9px] text-white/45 mb-0.5 md:mb-1">
              <span className="text-white/25 uppercase tracking-[0.1em]">Warm: </span>{candle.warmThrow}
            </p>
            <p className="font-sans text-[8px] md:text-[9px] text-white/45">
              <span className="text-white/25 uppercase tracking-[0.1em]">Mood: </span>{candle.mood}
            </p>
          </div>
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
  const headingRef = useRef(null)
  useSplitTextReveal(headingRef, { by: 'words', stagger: 0.08, duration: 1.1 })

  return (
    <section id="collection" className="py-24 md:py-36 px-6 md:px-12 bg-cream relative">
      {/* Subtle warm gradient at top */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-warm/60 to-transparent pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative">
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
          <h2
            ref={headingRef}
            className="font-serif text-4xl md:text-6xl font-light text-charcoal tracking-tight mb-4 overflow-hidden"
          >
            Three signatures, one ritual
          </h2>
          <motion.div className="w-8 h-[1px] bg-gold/30 mx-auto mt-6" variants={fadeUp} />
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
          <motion.div variants={fadeUp} className="w-8 h-[1px] bg-gold/30 mx-auto mb-6" />
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

function TheCraft() {
  const headingRef = useRef(null)
  useSplitTextReveal(headingRef, { by: 'words', stagger: 0.1, duration: 1.2 })

  const crafts = [
    {
      number: '01',
      title: 'Hand-Poured',
      desc: 'Every candle is poured by hand in small batches — no machines, no mass production.',
    },
    {
      number: '02',
      title: 'Premium Soy Wax',
      desc: '100% natural soy for a clean, even burn that lasts 60+ hours.',
    },
    {
      number: '03',
      title: 'Cotton Wicks',
      desc: 'Lead-free cotton wicks for a steady, soot-free flame every time.',
    },
    {
      number: '04',
      title: 'Iconic Scents',
      desc: 'Inspired by the fragrances you already love — translated into candle form.',
    },
  ]

  return (
    <section className="py-24 md:py-36 px-6 md:px-12 bg-warm relative overflow-hidden">
      {/* Background texture — subtle warm gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(196,168,124,0.06) 0%, transparent 50%)' }} />

      <div className="max-w-[1100px] mx-auto relative">
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="font-sans text-[10px] tracking-[0.4em] uppercase text-stone/50 mb-4">
            The Craft
          </motion.p>
          <h2
            ref={headingRef}
            className="font-serif text-3xl md:text-5xl font-light text-charcoal tracking-tight mb-4 overflow-hidden"
          >
            Made with intention
          </h2>
          <motion.div variants={fadeUp} className="w-12 h-[1px] bg-gold/40 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-16">
          {crafts.map((craft, i) => (
            <motion.div
              key={craft.number}
              className="flex gap-6 items-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="font-serif text-3xl md:text-4xl font-light text-gold/40 leading-none mt-1 shrink-0">
                {craft.number}
              </span>
              <div>
                <h3 className="font-sans text-[13px] tracking-[0.15em] uppercase text-charcoal mb-2">{craft.title}</h3>
                <div className="w-6 h-[1px] bg-gold/30 mb-3" />
                <p className="font-sans text-[13px] text-stone/60 leading-[1.8] font-light">{craft.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Manifesto() {
  const sectionRef = useRef(null)
  const quoteRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current || !quoteRef.current) return

    const split = new SplitType(quoteRef.current, { types: 'words' })
    if (!split.words || split.words.length === 0) return

    gsap.set(split.words, { opacity: 0.08 })

    const tween = gsap.to(split.words, {
      opacity: 1,
      stagger: 0.6,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=140%',
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      },
    })

    return () => {
      tween.kill()
      split.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center px-6 md:px-12 bg-charcoal overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(196,168,124,0.10) 0%, transparent 55%)',
        }}
      />
      <div className="max-w-[1100px] mx-auto relative z-10">
        <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-white/25 mb-8 text-center">
          Manifesto
        </p>
        <p
          ref={quoteRef}
          className="font-serif text-[clamp(1.75rem,5vw,3.75rem)] font-light text-white leading-[1.25] tracking-tight text-center"
        >
          A room remembers what it smells like. We pour slow, cure longer, and
          pick notes that linger — so the rooms you love become the rooms you
          never forget.
        </p>
        <div className="w-12 h-[1px] bg-gold/40 mx-auto mt-12" />
      </div>
    </section>
  )
}

function About() {
  const imgRef = useRef(null)
  const maskRef = useRef(null)
  const headlineRef = useRef(null)
  const copyRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1])

  useMaskReveal(maskRef, { direction: 'up' })
  useSplitTextReveal(headlineRef, { by: 'words', stagger: 0.08, duration: 1.1 })
  useSplitTextReveal(copyRef, { by: 'lines', stagger: 0.12, duration: 1.2, ease: 'power4.out' })

  return (
    <section id="about" className="py-24 md:py-36 px-6 bg-cream overflow-hidden">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div
          ref={maskRef}
          className="relative aspect-[4/3] md:aspect-[4/5] overflow-hidden"
        >
          <motion.img
            ref={imgRef}
            src="/images/lifestyle.jpg"
            alt="Hand-poured candle"
            className="w-full h-full object-cover"
            style={{ y: imgY, scale: imgScale }}
          />
          {/* Gold accent border */}
          <div className="absolute bottom-0 left-0 w-16 h-[1px] bg-gold/40" />
          <div className="absolute bottom-0 left-0 w-[1px] h-16 bg-gold/40" />
        </div>
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
          <motion.div variants={fadeUp} className="w-8 h-[1px] bg-gold/40 mb-10" />
          <h3
            ref={headlineRef}
            className="font-serif text-3xl md:text-4xl font-light text-charcoal tracking-tight leading-[1.1] mb-8 overflow-hidden"
          >
            Scent is memory, made tangible.
          </h3>
          <p
            ref={copyRef}
            className="font-sans text-[14px] text-stone/60 leading-[1.9] font-light mb-8 overflow-hidden"
          >
            We believe the fragrances you love shouldn't disappear when you leave the room.
            Each candle is hand-poured in small batches using premium soy wax and cotton wicks.
            No shortcuts. No synthetics. Just clean-burning, long-lasting luxury.
          </p>
          <motion.div variants={fadeUp} className="w-8 h-[1px] bg-gold/40 mt-4" />
        </motion.div>
      </div>
    </section>
  )
}

function Contact() {
  const headingRef = useRef(null)
  useSplitTextReveal(headingRef, { by: 'words', stagger: 0.08, duration: 1.1 })

  return (
    <section id="contact" className="py-24 md:py-36 px-6 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/images/smoke.jpg" alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-charcoal/80" />
      </div>
      {/* Warm ambient glow */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(196,168,124,0.06) 0%, transparent 60%)' }} />

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
        <h2
          ref={headingRef}
          className="font-serif text-3xl md:text-4xl font-light text-white mb-4 tracking-tight overflow-hidden"
        >
          Stay in the know
        </h2>
        <motion.p variants={fadeUp} className="font-sans text-[13px] text-white/35 font-light mb-10">
          New scents, restocks, and limited drops.
        </motion.p>
        <motion.form variants={fadeUp} onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-0">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 bg-transparent border border-white/15 sm:border-r-0 px-5 py-3.5 font-sans text-[12px] text-white placeholder:text-white/25 focus:outline-none focus:border-gold/40 transition-colors"
          />
          <motion.button
            type="submit"
            className="font-sans text-[10px] tracking-[0.2em] uppercase bg-white text-charcoal px-6 py-3.5 hover:bg-gold-light transition-colors duration-500"
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
      <Marquee />
      <Collection />
      <TheCraft />
      <Manifesto />
      <About />
      <Contact />
    </>
  )
}
