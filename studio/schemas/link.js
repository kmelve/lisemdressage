import External from 'react-icons/lib/fa/external-link'

export default {
  title: 'External Link',
  name: 'externalLink',
  type: 'object',
  blockEditor: {
    icon: External
  },
  fields: [
    {
      title: 'URL',
      name: 'href',
      type: 'string',
      validation: Rule =>
        Rule.uri({
          allowRelative: true,
          scheme: ['https', 'http', 'mailto', 'tel']
        })
    },
    {
      title: 'Open in new tab',
      name: 'blank',
      description: 'Read https://css-tricks.com/use-target_blank/',
      type: 'boolean'
    }
  ]
}
