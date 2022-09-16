export default {
  title: 'Utilisateur',
  name: 'user',
  type: 'document',
  fields: [
    {
      title: 'Nom',
      name: 'first_name',
      type: 'string',
    },
    {
      title: 'Prenom',
      name: 'last_name',
      type: 'string',
    },
    {
      title: 'Pseudo',
      name: 'username',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((email) => {
          if (typeof email === 'undefined') {
            return true; // Allow undefined values
          }

          return email
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
            ? true
            : 'This is not an email';
        }),
    },
    {
      title: 'Photo',
      name: 'photo',
      type: 'image',
    },
    {
      title: 'PhotoCover',
      name: 'photocover',
      type: 'image',
    },
    {
      title: 'Bio',
      name: 'bio',
      type: 'text',
    },
    {
      title: 'Anniversaire',
      name: 'birthday',
      type: 'text',
    },
    {
      title: 'Vie à',
      name: 'livesin',
      type: 'text',
    },
    {
      title: 'Travail à',
      name: 'workat',
      type: 'text',
    },
    {
      title: 'Following',
      name: 'following',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'user' }],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
    {
      title: 'Date de creation',
      name: 'created_at',
      type: 'datetime',
    },
  ],
};
