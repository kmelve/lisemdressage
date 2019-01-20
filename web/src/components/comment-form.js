import React from 'react'
import Disqus from 'disqus-react'
import { getBlogUrl } from '../lib/helpers'
export default class CommentForm extends React.Component {
  render () {
    const disqusShortname = 'lise-m-dressage'
    const { identifier, title, publishedAt, slug } = this.props.article

    const url = `https://www.lisemdressage.no${getBlogUrl(
      new Date(publishedAt),
      slug
    )}`

    const disqusConfig = {
      url,
      identifier,
      title
    }

    return (
      <div className='article'>
        <h1>Kommentarer og reaksjoner: {title}</h1>
        <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>
          Comments
        </Disqus.CommentCount>
        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div>
    )
  }
}
