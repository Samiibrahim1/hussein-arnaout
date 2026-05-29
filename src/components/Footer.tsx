import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-ink text-white/50 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <p className="font-serif text-white text-lg tracking-widest uppercase mb-3">
            Studio Arnaout
          </p>
          <p className="text-[12px] leading-relaxed max-w-[18ch]">
            Crafting timeless interiors since 2022.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-5">Navigate</p>
          <ul className="space-y-3">
            {[
              { href: '/projects', label: 'Projects' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-[12px] uppercase tracking-[0.15em] hover:text-white transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-5">Contact</p>
          <p className="text-[12px] mb-1">hello@studioarnaout.com</p>
          <p className="text-[12px]">Beirut, Lebanon</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] px-6 md:px-10 py-5">
        <p className="text-[11px] text-white/20">
          © {new Date().getFullYear()} Studio Arnaout. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
