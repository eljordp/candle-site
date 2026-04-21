import { useState } from 'react'

const candles = [
  {
    id: 1,
    name: 'Sauvage',
    inspiration: 'Dior Sauvage',
    price: 48,
    notes: 'Bergamot, Ambroxan, Vanilla',
    description: 'Raw, magnetic, untamed. A wild freshness that opens with Calabrian bergamot before settling into a warm, woody embrace. For the one who walks into a room and changes it.',
    color: 'from-blue-950 via-slate-900 to-zinc-800',
    accent: '#2C3E6B',
  },
  {
    id: 2,
    name: 'Rouge',
    inspiration: 'Baccarat Rouge 540',
    price: 58,
    notes: 'Saffron, Jasmine, Ambergris, Cedar',
    description: 'Liquid crystal. Saffron and jasmine dissolve into a luminous amber that lingers for hours — ethereal, addictive, unmistakable. The scent people ask about.',
    color: 'from-red-950 via-rose-900 to-amber-900',
    accent: '#8B2252',
  },
  {
    id: 3,
    name: 'Guilty',
    inspiration: 'Gucci Guilty',
    price: 48,
    notes: 'Mandarin, Lilac, Patchouli',
    description: 'Unapologetic warmth. Italian mandarin and pink pepper give way to a bold patchouli base — sensual, daring, and impossibly smooth. For nights that don\'t end early.',
    color: 'from-stone-900 via-neutral-800 to-zinc-900',
    accent: '#5C4033',
  },
]

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-charcoal">
          LUMIERE
        </a>
        <div className="hidden md:flex items-center gap-10 font-sans text-[13px] tracking-[0.15em] uppercase text-stone">
          <a href="#collection" className="hover:text-charcoal transition-colors duration-300">Collection</a>
          <a href="#story" className="hover:text-charcoal transition-colors duration-300">Story</a>
          <a href="#contact" className="hover:text-charcoal transition-colors duration-300">Contact</a>
        </div>
        <a href="#collection" className="font-sans text-[12px] tracking-[0.15em] uppercase border border-charcoal/20 px-5 py-2.5 hover:bg-charcoal hover:text-cream transition-all duration-300">
          Shop
        </a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-warm via-cream to-cream" />
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <p className="font-sans text-[11px] md:text-[13px] tracking-[0.35em] uppercase text-stone mb-6 md:mb-8">
          Luxury Fragrance Candles
        </p>
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-light text-charcoal leading-[0.9] tracking-tight mb-8 md:mb-10">
          Scent is<br />
          <em className="italic text-stone">memory</em>
        </h1>
        <p className="font-sans text-base md:text-lg text-stone max-w-lg mx-auto leading-relaxed font-light mb-12">
          Hand-poured candles inspired by the world's most iconic fragrances.
          Each one crafted to fill your space with something unforgettable.
        </p>
        <a
          href="#collection"
          className="inline-block font-sans text-[12px] tracking-[0.2em] uppercase bg-charcoal text-cream px-10 py-4 hover:bg-stone transition-colors duration-500"
        >
          Explore the Collection
        </a>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="text-stone/40">
          <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="2" fill="currentColor" className="animate-pulse" />
        </svg>
      </div>
    </section>
  )
}

function CandleCard({ candle, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const isReversed = index % 2 !== 0

  return (
    <div className="grid md:grid-cols-2 gap-0 min-h-[80vh]">
      {/* Image Side */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${candle.color} flex items-center justify-center min-h-[50vh] ${isReversed ? 'md:order-2' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
        </div>
        <div className={`relative transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}>
          <div className="w-48 h-64 md:w-56 md:h-72 rounded-sm bg-white/10 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center shadow-2xl">
            <div className="w-6 h-0.5 bg-gold mb-4 rounded-full" />
            <span className="font-serif text-white/90 text-3xl md:text-4xl tracking-wide">{candle.name}</span>
            <div className="w-6 h-0.5 bg-gold mt-4 rounded-full" />
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/50 mt-6">LUMIERE</span>
          </div>
        </div>
      </div>

      {/* Text Side */}
      <div className={`flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 md:py-0 bg-cream ${isReversed ? 'md:order-1' : ''}`}>
        <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
          Inspired by {candle.inspiration}
        </p>
        <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-charcoal mb-6 tracking-tight">
          {candle.name}
        </h2>
        <p className="font-sans text-stone leading-relaxed mb-8 text-[15px] font-light max-w-md">
          {candle.description}
        </p>
        <div className="mb-10">
          <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-stone/60 mb-2">Notes</p>
          <p className="font-serif text-lg italic text-charcoal/80">{candle.notes}</p>
        </div>
        <div className="flex items-center gap-8">
          <span className="font-serif text-3xl text-charcoal">${candle.price}</span>
          <button className="font-sans text-[12px] tracking-[0.2em] uppercase bg-charcoal text-cream px-8 py-3.5 hover:bg-stone transition-colors duration-500">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

function Story() {
  return (
    <section id="story" className="py-24 md:py-36 px-6 bg-warm">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-gold mb-6">Our Story</p>
        <h2 className="font-serif text-4xl md:text-6xl font-light text-charcoal mb-10 tracking-tight leading-tight">
          Born from obsession,<br />
          <em className="italic text-stone">poured with intention</em>
        </h2>
        <p className="font-sans text-stone text-[15px] md:text-base leading-relaxed font-light mb-8 max-w-xl mx-auto">
          We believe the fragrances you love shouldn't disappear when you leave the room.
          Each candle is hand-poured in small batches using premium soy wax and cotton wicks,
          capturing the essence of iconic scents reimagined for your space.
        </p>
        <p className="font-sans text-stone text-[15px] md:text-base leading-relaxed font-light max-w-xl mx-auto">
          No shortcuts. No synthetics. Just clean-burning, long-lasting luxury
          that transforms any room into something worth staying in.
        </p>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { title: '60+ Hours', subtitle: 'Burn Time', desc: 'Slow, even burn from first light to last.' },
    { title: '100% Soy', subtitle: 'Clean Wax', desc: 'No paraffin. No toxins. Just pure soy.' },
    { title: 'Hand-Poured', subtitle: 'Small Batch', desc: 'Every candle made with intention.' },
  ]

  return (
    <section className="py-20 md:py-28 px-6 bg-cream">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 md:gap-16">
        {features.map((f, i) => (
          <div key={i} className="text-center">
            <p className="font-serif text-4xl md:text-5xl text-charcoal mb-2">{f.title}</p>
            <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-gold mb-4">{f.subtitle}</p>
            <p className="font-sans text-stone text-sm font-light">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-24 md:py-36 px-6 bg-charcoal text-cream">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-gold mb-6">Stay Close</p>
        <h2 className="font-serif text-4xl md:text-5xl font-light mb-6 tracking-tight">
          Be the first to know
        </h2>
        <p className="font-sans text-cream/50 text-[15px] font-light mb-10 max-w-md mx-auto">
          New scents, restocks, and limited editions — straight to your inbox. No spam, ever.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 bg-transparent border border-cream/20 px-5 py-3.5 font-sans text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold transition-colors"
          />
          <button
            type="submit"
            className="font-sans text-[12px] tracking-[0.2em] uppercase bg-gold text-charcoal px-8 py-3.5 hover:bg-gold-light transition-colors duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-10 px-6 bg-charcoal border-t border-cream/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-serif text-xl tracking-[0.2em] text-cream/60">LUMIERE</span>
        <p className="font-sans text-[12px] text-cream/30">&copy; {new Date().getFullYear()} Lumiere. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <section id="collection">
        {candles.map((candle, i) => (
          <CandleCard key={candle.id} candle={candle} index={i} />
        ))}
      </section>
      <Features />
      <Story />
      <Contact />
      <Footer />
    </div>
  )
}
