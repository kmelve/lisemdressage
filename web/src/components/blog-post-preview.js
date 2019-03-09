import { Link } from 'gatsby'
import React from 'react'
import Lazyload from 'react-lazyload'
import { format } from 'date-fns'
import { buildImageObj, cn, getBlogUrl } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockText from './block-text'

import styles from './blog-post-preview.module.css'
import { responsiveTitle3 } from './typography.module.css'

function BlogPostPreview (props) {
  return (
    <Link className={styles.root} to={getBlogUrl(props.publishedAt, props.slug.current)}>
      <div className={styles.leadMediaThumb}>
        {props.mainImage && props.mainImage.asset && (
          <Lazyload height={Math.floor((9 / 16) * 600)}>
            <img
              src={imageUrlFor(buildImageObj(props.mainImage))
                .width(600)
                .height(Math.floor((9 / 16) * 600))
                .url() + '&auto=format&q=100'}
              alt={props.mainImage.alt}
            /></Lazyload>
        )}
      </div>
      <span className={styles.byline}>{format(props.publishedAt, 'DD.MM.YYYY')}</span>
      <h3 className={cn(responsiveTitle3, styles.title)}>{props.title}</h3>
      {props._rawExcerpt && (
        <div className={styles.excerpt}>
          <BlockText blocks={props._rawExcerpt} />
        </div>
      )}
    </Link>
  )
}

export default BlogPostPreview
