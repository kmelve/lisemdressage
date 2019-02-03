import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import BlogPostPreviewGrid from '../components/blog-post-preview-grid'
import { mapEdgesToNodes } from '../lib/helpers'
const detailsQuery = graphql`
  query getPosts {
    allSanityPost(
      limit: 3
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } } }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`

function BlogPostsNext () {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const postNodes = (data || {}).allSanityPost ? mapEdgesToNodes(data.allSanityPost) : []
        if (!postNodes) {
          return <div>No posts</div>
        }
        return (
          <BlogPostPreviewGrid
            title='Nyeste innlegg'
            nodes={postNodes}
            browseMoreHref='/blog/'
          />
        )
      }}
    />
  )
}

export default BlogPostsNext
