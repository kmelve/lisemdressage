import MdPerson from 'react-icons/lib/md/person'

export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: MdPerson,
  liveEdit: false,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'blockContent'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  },

}
