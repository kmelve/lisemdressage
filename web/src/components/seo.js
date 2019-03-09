import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'

const detailsQuery = graphql`
  query SEOQuery {
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      description
      keywords
      author
    }
  }
`

function SEO ({ description, lang, meta, keywords = [], title, image, slug }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        if (!data.site) {
          return
        }
        const ogImage = image && imageUrlFor(buildImageObj(image))
          .width(1200)
          .height(Math.floor(1 / 1.91 * 1200))
          .fit('crop')
          .url() + '&auto=format&q=100'
        const metaDescription = description || data.site.description
        return (
          <Helmet
            htmlAttributes={{
              lang
            }}
            title={title}
            titleTemplate={title === data.site.title ? '%s' : `%s | ${data.site.title}`}
            meta={[
              {
                name: 'description',
                content: metaDescription
              },
              {
                name: 'og:url',
                content: 'https://www.lisemdressage.no' + slug || 'https://www.lisemdressage.no'
              },
              ...(ogImage && {
                name: 'og:image',
                content: ogImage
              }),
              {
                property: 'og:title',
                content: title
              },
              {
                property: 'og:description',
                content: metaDescription
              },
              {
                property: 'og:type',
                content: 'website'
              },
              {
                name: 'twitter:card',
                content: 'summary'
              },
              {
                name: 'twitter:creator',
                content: data.site.author
              },
              {
                name: 'twitter:title',
                content: title
              },
              {
                name: 'twitter:description',
                content: metaDescription
              }
            ]
              .concat(
                keywords && keywords.length > 0
                  ? {
                    name: 'keywords',
                    content: keywords.join(', ')
                  }
                  : []
              )
              .concat(meta)}
          />
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
  image: ''
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    asset: PropTypes.shape({
      id: PropTypes.string
    })
  })
}

export default SEO
