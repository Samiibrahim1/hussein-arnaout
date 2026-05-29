'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { urlFor } from '@/lib/sanity'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  category: string
  year: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage: any
}

export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project
  index?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <Link href={`/projects/${project.slug.current}`} className="group block">
        {/* Image */}
        <div className="relative overflow-hidden bg-subtle aspect-[4/3]">
          {project.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={urlFor(project.coverImage).width(900).height(675).url()}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />

          {/* Year badge — appears on hover */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-white text-ink text-[10px] uppercase tracking-[0.2em] px-3 py-1.5">
              {project.year}
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="pt-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-1.5">
            {project.category}
          </p>
          <h3 className="font-serif text-[1.15rem] text-ink leading-snug group-hover:underline underline-offset-4 decoration-1">
            {project.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  )
}
