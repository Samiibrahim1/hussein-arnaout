'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowDown } from 'lucide-react'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const LINE = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, delay: 0.3, ease: EASE },
  },
}

const WORD = (delay: number) => ({
  hidden: { opacity: 0, y: '110%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.9, delay, ease: EASE },
  },
})

export default function Hero() {
  return (
    <section className="relative h-screen bg-black flex flex-col justify-between overflow-hidden">

      {/* Top meta row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="flex justify-between items-center px-6 md:px-12 pt-24"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
          Interior Design Studio
        </span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
          Est. 2022
        </span>
      </motion.div>

      {/* Divider line */}
      <motion.hr
        variants={LINE}
        initial="hidden"
        animate="visible"
        className="border-t border-white/10 mx-6 md:mx-12"
      />

      {/* Headline */}
      <div className="px-6 md:px-12 flex-1 flex items-center">
        <div>
          {/* Each line clips the text during animation */}
          <div className="overflow-hidden">
            <motion.h1
              variants={WORD(0.4)}
              initial="hidden"
              animate="visible"
              className="font-serif text-[clamp(3.2rem,9.5vw,8.5rem)] text-white leading-[0.88] tracking-tight"
            >
              Where
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              variants={WORD(0.52)}
              initial="hidden"
              animate="visible"
              className="font-serif text-[clamp(3.2rem,9.5vw,8.5rem)] text-white leading-[0.88] tracking-tight"
            >
              Space Becomes
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              variants={WORD(0.64)}
              initial="hidden"
              animate="visible"
              className="font-serif italic text-[clamp(3.2rem,9.5vw,8.5rem)] text-white/[0.12] leading-[0.88] tracking-tight"
            >
              Art.
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Divider line */}
      <motion.hr
        variants={LINE}
        initial="hidden"
        animate="visible"
        className="border-t border-white/10 mx-6 md:mx-12"
      />

      {/* Bottom row: tagline + CTAs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.7 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-6 md:px-12 pb-12"
      >
        <p className="text-white/40 text-[13px] leading-relaxed max-w-xs">
          We design environments that reflect your personality<br className="hidden md:block" />
          and elevate your everyday life.
        </p>

        <div className="flex items-center gap-6">
          <Link
            href="/projects"
            className="flex items-center gap-2.5 bg-white text-black text-[11px] uppercase tracking-[0.18em] px-6 py-3 hover:bg-white/90 transition-colors"
          >
            View Projects <ArrowRight size={12} />
          </Link>
          <Link
            href="/contact"
            className="text-white/40 text-[11px] uppercase tracking-[0.18em] hover:text-white transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown size={13} className="text-white/25" />
        </motion.div>
      </motion.div>
    </section>
  )
}
