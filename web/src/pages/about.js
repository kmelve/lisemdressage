import React from 'react'
import { graphql } from 'gatsby'
import BlockContent from '../components/block-content'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import SEO from '../components/seo'
import styles from '../components/blog-post.module.css'
import Layout from '../containers/layout'

import { responsiveTitle1 } from '../components/typography.module.css'

export const query = graphql`
  query AboutPageQuery {
    person:
  sanityPerson(_id: { eq: "a86dd724-8da5-4a72-9e97-31c9c9589f96"}) {
    _id
    slug {
      current
    }
    name
    _rawBio
    image {
      asset {
        _id
      }
    }

  }

  }
`

const AboutPage = props => {
  const { data, errors } = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const { person } = data
  const { name, _rawBio, image} = person
  return (
    <Layout>
      <SEO title={name} />
      {image && image.asset && (
        <div className={styles.mainImage}>
        <img
          src={imageUrlFor(buildImageObj(image))
            .width(1200)
            .height(Math.floor((9 / 16) * 1200))
            .fit('crop')
            .url()}
          alt={'Lise M'}
        />
      </div>
      )}
      <Container>
        <h1 className={responsiveTitle1}>{name}</h1>
        <BlockContent
          blocks={_rawBio || []}
        />

      </Container>
    </Layout>
  )
}

export default AboutPage
