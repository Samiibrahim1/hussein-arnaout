import { client } from '@/lib/sanity'
import { featuredProjectsQuery } from '@/lib/queries'
import Hero from '@/components/Hero'
import ProjectCard from '@/components/ProjectCard'
import FadeIn from '@/components/FadeIn'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const revalidate = 60

const TICKER_TEXT = 'RESIDENTIAL  ·  COMMERCIAL  ·  HOSPITALITY  ·  RETAIL  ·  BESPOKE SPACES  ·  '

const STATS = [
  { value: '80+', label: 'Projects' },
  { value: '4+',  label: 'Years' },
  { value: '12',   label: 'Awards' },
  { value: '4',    label: 'Countries' },
]

const PROCESS = [
  { n: '01', title: 'Discover', body: 'We immerse ourselves in your world — your habits, tastes, and aspirations — before drawing a single line.' },
  { n: '02', title: 'Design',   body: 'Spatial concepts, material palettes, and bespoke furniture are crafted into a coherent visual language.' },
  { n: '03', title: 'Deliver',  body: 'Every detail is executed with precision. We oversee the project from first sketch to final installation.' },
]

export default async function HomePage() {
  const projects = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    ? await client.fetch(featuredProjectsQuery)
    : []

  return (
    <>
      {/* ── 1. Hero ──────────────────────────────────────── */}
      <Hero />

      {/* ── 2. Ticker ────────────────────────────────────── */}
      <div
        className="border-y border-border overflow-hidden py-4 select-none bg-white"
        aria-hidden="true"
      >
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee 32s linear infinite' }}
        >
          {/* Two identical copies so the loop is seamless */}
          {[0, 1].map((i) => (
            <span
              key={i}
              className="text-[10px] uppercase tracking-[0.25em] text-muted"
            >
              {TICKER_TEXT.repeat(6)}
            </span>
          ))}
        </div>
      </div>

      {/* ── 3. Selected Work ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-20">
        <FadeIn className="flex items-end justify-between mb-14">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-3">
              Selected Work
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight">
              Recent Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden md:flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors group"
          >
            View All
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </FadeIn>

        {projects.length === 0 ? (
          /* Empty state: shows project placeholders while Sanity has no data */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="opacity-[0.35]">
                <div className="aspect-[4/3] bg-subtle" />
                <div className="pt-4 space-y-2">
                  <div className="h-2 w-16 bg-border rounded-full" />
                  <div className="h-4 w-40 bg-border rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {projects.map(
              (project: Parameters<typeof ProjectCard>[0]['project'], i: number) => (
                <ProjectCard key={project._id} project={project} index={i} />
              )
            )}
          </div>
        )}

        {/* Mobile "View All" */}
        <div className="mt-12 md:hidden">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors"
          >
            View All Projects <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* ── 4. Stats bar ─────────────────────────────────── */}
      <FadeIn>
        <div className="border-y border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {STATS.map(({ value, label }) => (
              <div key={label} className="px-6 md:px-10 first:pl-0 last:pr-0 text-center md:text-left py-4 md:py-0">
                <p className="font-serif text-3xl md:text-4xl text-ink mb-1">{value}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* ── 5. Process ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <FadeIn className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-3">Our Approach</p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink">How We Work</h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-border border border-border">
          {PROCESS.map(({ n, title, body }, i) => (
            <FadeIn key={n} delay={i * 0.1} className="p-8 md:p-10">
              <p className="font-serif text-5xl text-ink/10 mb-6 leading-none">{n}</p>
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-ink mb-4">{title}</h3>
              <p className="text-[13px] text-muted leading-relaxed">{body}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── 6. CTA banner ────────────────────────────────── */}
      <FadeIn>
        <section className="bg-ink mx-6 md:mx-10 mb-24 px-10 md:px-20 py-20 md:py-28 flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 mb-6">
              Start a Project
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight max-w-md">
              Ready to transform
              <br />
              <span className="italic text-white/30">your space?</span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <Link
              href="/contact"
              className="flex items-center gap-2.5 bg-white text-ink text-[11px] uppercase tracking-[0.18em] px-7 py-3.5 hover:bg-white/90 transition-colors"
            >
              Book a Consultation <ArrowRight size={12} />
            </Link>
            <p className="text-white/30 text-[11px]">hello@studioarnaout.com</p>
          </div>
        </section>
      </FadeIn>
    </>
  )
}
