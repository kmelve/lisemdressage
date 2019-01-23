import React, { Fragment } from 'react'
import { buildImageObj } from '../../lib/helpers'
import { imageUrlFor } from '../../lib/image-url'

import styles from './figure.module.css'

function Figure (props) {
  return (
    <figure className={styles.root}>
      {props.asset && (
        <Fragment>
          <source
            srcSet={imageUrlFor(buildImageObj(props))
              .format('webp')
              .url()}
            type='image/webp'
          />
          <source
            srcSet={imageUrlFor(buildImageObj(props))
              .format('jpg')
              .url()}
            type='image/jpeg'
          />
          <img
            src={imageUrlFor(buildImageObj(props))
              .format('jpg')
              .url()}
            alt={props.alt}
          />
        </Fragment>
      )}
      <figcaption className={styles.caption}>{props.caption}</figcaption>
    </figure>
  )
}

export default Figure
