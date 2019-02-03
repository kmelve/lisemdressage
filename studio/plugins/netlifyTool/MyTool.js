import React from 'react'
import Button from 'part:@sanity/components/buttons/default'

// Sanity uses CSS modules for styling. We import a stylesheet and get an
// object where the keys matches the class names defined in the CSS file and
// the values are a unique, generated class name. This allows you to write CSS
// with only your components in mind without any conflicting class names.
// See https://github.com/css-modules/css-modules for more info.
import styles from './MyTool.css'

class MyTool extends React.Component {
  deployOnNetlify = () => {
    window
      .fetch('https://api.netlify.com/build_hooks/5c3253bc220c45b6fcd7f82a', {
        method: 'POST',
        body: {}
      })
      .then(res => console.log(res) || this.setState({ published: true }))
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div className={styles.container}>
        <Button onClick={this.deployOnNetlify}>Deploy changes!</Button>
        {this.state && this.state.published && <h3>Publishing changes – check in a couple of minutes!</h3>}
      </div>
    )
  }
}

export default MyTool
