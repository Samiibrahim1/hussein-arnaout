import { client } from '@/lib/sanity'
import { allProjectsQuery } from '@/lib/queries'
import ProjectCard from '@/components/ProjectCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Browse our portfolio of interior design projects.',
}

export const revalidate = 60

export default async function ProjectsPage() {
  const projects = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    ? await client.fetch(allProjectsQuery)
    : []

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <p className="text-sm uppercase tracking-widest text-accent mb-3">Portfolio</p>
        <h1 className="font-serif text-5xl md:text-6xl text-charcoal">Our Work</h1>
      </div>

      {projects.length === 0 ? (
        <p className="text-charcoal/50 text-center py-24">
          No projects yet. Add some in Sanity Studio.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: Parameters<typeof ProjectCard>[0]['project']) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
