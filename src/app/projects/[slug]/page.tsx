import { client, urlFor } from '@/lib/sanity'
import { singleProjectQuery, allProjectsQuery } from '@/lib/queries'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const revalidate = 60

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  const projects = await client.fetch(allProjectsQuery)
  return projects.map((p: { slug: { current: string } }) => ({ slug: p.slug.current }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const project = await client.fetch(singleProjectQuery, { slug })
  if (!project) return {}
  return {
    title: project.title,
    description: `${project.category} project from ${project.year}`,
  }
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const project = await client.fetch(singleProjectQuery, { slug })
  if (!project) notFound()

  return (
    <article className="pt-24 pb-24 max-w-6xl mx-auto px-6">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-widest text-accent mb-3">
          {project.category} · {project.year}
        </p>
        <h1 className="font-serif text-4xl md:text-6xl text-charcoal mb-6">{project.title}</h1>
      </div>

      {project.coverImage && (
        <div className="relative aspect-video mb-12 overflow-hidden">
          <Image
            src={urlFor(project.coverImage).width(1400).height(787).url()}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {project.description && (
        <div className="max-w-2xl mb-16 text-charcoal/75 leading-relaxed space-y-4">
          <PortableText value={project.description} />
        </div>
      )}

      {project.images?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.images.map((img: { alt?: string; asset: unknown }, i: number) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={urlFor(img).width(900).height(675).url()}
                alt={img.alt || project.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  )
}
