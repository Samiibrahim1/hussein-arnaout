import { groq } from 'next-sanity'

export const allProjectsQuery = groq`
  *[_type == "project"] | order(year desc) {
    _id,
    title,
    slug,
    category,
    year,
    featured,
    coverImage,
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(year desc) {
    _id,
    title,
    slug,
    category,
    year,
    coverImage,
  }
`

export const recentProjectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) [0..2] {
    _id,
    title,
    slug,
    category,
    year,
    coverImage,
  }
`

export const aboutQuery = groq`
  *[_type == "about" && _id == "about"][0] {
    photo,
    bio,
    stats,
  }
`

export const singleProjectQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    year,
    description,
    coverImage,
    images,
  }
`
