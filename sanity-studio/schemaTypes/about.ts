import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'photo',
      title: 'Studio Photo',
      type: 'image',
      description: 'The portrait / studio photo shown on the About page.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'bio',
      title: 'Bio Paragraphs',
      type: 'array',
      description: 'Each item becomes a separate paragraph.',
      of: [{ type: 'text', rows: 4 }],
    }),

    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      description: 'The four numbers shown below the bio (e.g. 80+ Projects).',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
  ],

  preview: {
    select: { media: 'photo' },
    prepare() {
      return { title: 'About Page' }
    },
  },
})
