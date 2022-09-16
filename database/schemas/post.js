export default {
  title: 'Posts',
  name: 'post',
  type: 'document',
  fields: [
    {
      title: 'Photo',
      name: 'photo',
      type: 'image',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
    },
    {
      title: 'Date de creation',
      name: 'created_at',
      type: 'datetime',
    },
    {
      title: 'Auteur',
      name: 'author',
      type: 'reference',
      to: [{ type: 'user' }],
    },
    {
      title: 'Like',
      name: 'like',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'user' }],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
  ],
};
