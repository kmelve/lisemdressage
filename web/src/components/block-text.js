import BaseBlockContent from '@sanity/block-content-to-react'
import React from 'react'
import Figure from './block-content/figure'
import LazyLoad from 'react-lazyload';
import typography from './typography.module.css'

const serializers = {
  types: {
    block (props) {
      switch (props.node.style) {
        default:
          return <p className={typography.paragraph}>{props.children}</p>
      }
    },
    figure (props) {
      return  <LazyLoad><Figure {...props.node} /></LazyLoad>
    },
  },
  marks: {
    externalLink: ({ mark, children }) => {
      // Read https://css-tricks.com/use-target_blank/
      const { blank, url } = mark
      return blank ? (
        <a href={url} target="_blank" rel="noopener">
          {children}
        </a>
      ) : (
        <a href={url}>{children}</a>
      )
    }
  }
}

const BlockText = ({ blocks }) => (
  <BaseBlockContent blocks={blocks} serializers={serializers} />
)

export default BlockText
