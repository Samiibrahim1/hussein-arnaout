'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { clsx } from 'clsx'

const links = [
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // On the homepage before scroll, nav floats over the black hero
  const overHero = pathname === '/' && !scrolled

  return (
    <header
      className={clsx(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        overHero
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-sm border-b border-black/[0.06]'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={clsx(
            'font-serif text-lg tracking-widest uppercase transition-colors duration-500',
            overHero ? 'text-white' : 'text-ink'
          )}
        >
          Studio Arnaout
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={clsx(
                  'text-[11px] tracking-[0.2em] uppercase transition-colors duration-300',
                  overHero
                    ? pathname === href
                      ? 'text-white'
                      : 'text-white/50 hover:text-white'
                    : pathname === href
                    ? 'text-ink'
                    : 'text-muted hover:text-ink'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className={clsx(
            'md:hidden transition-colors duration-300',
            overHero ? 'text-white' : 'text-ink'
          )}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-black/[0.06] px-6 py-8">
          <ul className="flex flex-col gap-6">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-[11px] tracking-[0.2em] uppercase text-ink hover:text-muted transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
