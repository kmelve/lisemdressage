import { format, distanceInWords, differenceInDays } from 'date-fns'
import React from 'react'
import LazyLoad from 'react-lazyload'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlogPostsNext from './blog-post-next'
import BlockContent from './block-content'
import Container from './container'
import RoleList from './role-list'
import ContentForm from './comment-form'
import styles from './blog-post.module.css'

function BlogPost (props) {
  const {
    _id,
    _rawBody,
    authors,
    categories,
    title,
    mainImage,
    publishedAt,
    slug
  } = props
  return (
    <article className={styles.root}>
      <Container>
        <div className={styles.grid}>
          <article className={styles.mainContent}>
            {mainImage &&
              mainImage.asset && (
              <div className={styles.mainImage}>
                <img
                  src={imageUrlFor(buildImageObj(mainImage))
                    .width(1200)
                    .height(Math.floor(9 / 16 * 1200))
                    .fit('crop')
                    .url() + '&auto=format&q=100'}
                  alt={mainImage.alt}
                />
              </div>
            )}
            <h1 className={styles.title}>{title}</h1>
            {_rawBody && <BlockContent blocks={_rawBody} />}
            <div>
              <LazyLoad height='650'>
                <ContentForm
                  article={{
                    slug,
                    identifier: _id,
                    title,
                    publishedAt
                  }}
                />
              </LazyLoad>
            </div>
          </article>
          <aside className={styles.metaContent}>
            {publishedAt && (
              <div className={styles.publishedAt}>
                {differenceInDays(new Date(publishedAt), new Date()) > 3
                  ? distanceInWords(new Date(publishedAt), new Date())
                  : format(new Date(publishedAt), 'MMMM Do YYYY')}
              </div>
            )}
            {authors && <RoleList items={authors} title='Forfatter' />}
            {categories && (
              <div className={styles.categories}>
                <h3 className={styles.categoriesHeadline}>Categories</h3>
                <ul>
                  {categories.map(category => (
                    <li key={category._id}>{category.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
        <BlogPostsNext />
      </Container>
    </article>
  )
}

export default BlogPost
