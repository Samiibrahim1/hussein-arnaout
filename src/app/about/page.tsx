import type { Metadata } from 'next'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import { aboutQuery } from '@/lib/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Studio Arnaout and our design philosophy.',
}

const DEFAULT_STATS = [
  { value: '15+',  label: 'Years Experience' },
  { value: '200+', label: 'Projects Completed' },
  { value: '12',   label: 'Design Awards' },
  { value: '4',    label: 'Countries' },
]

const DEFAULT_BIO = [
  'Studio Arnaout was founded on the belief that great design is not just about aesthetics — it\'s about creating spaces that resonate with the people who inhabit them.',
  'With over a decade of experience across residential, commercial, and hospitality projects, we bring a meticulous eye for detail and a deep understanding of how people live and work.',
  'Every project begins with listening. We immerse ourselves in your world before we ever pick up a pencil.',
]

export default async function AboutPage() {
  const about = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    ? await client.fetch(aboutQuery)
    : null

  const stats = about?.stats?.length ? about.stats : DEFAULT_STATS
  const bio   = about?.bio?.length   ? about.bio   : DEFAULT_BIO

  return (
    <div className="pt-24 pb-24 max-w-5xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">

        {/* Text */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-4">
            About the Studio
          </p>
          <h1 className="font-serif text-5xl leading-tight mb-8 text-ink">
            Design that tells
            <br />
            <span className="italic text-ink/30">your story</span>
          </h1>
          <div className="space-y-4 text-muted text-[14px] leading-relaxed">
            {bio.map((paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Photo */}
        <div className="relative aspect-[3/4] overflow-hidden bg-subtle">
          {about?.photo ? (
            <Image
              src={urlFor(about.photo).width(800).height(1067).url()}
              alt="Studio Arnaout"
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted/40">
                Add photo in Sanity Studio
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-24 border-t border-border divide-x divide-border">
        {stats.map(({ value, label }: { value: string; label: string }) => (
          <div key={label} className="px-6 py-10 first:pl-0 text-center md:text-left">
            <p className="font-serif text-4xl text-ink mb-2">{value}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
