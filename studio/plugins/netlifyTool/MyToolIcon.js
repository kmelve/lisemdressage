import React, {Component} from 'react'

/**
 * Kind of a hacky way to force the Netlify badge to
 * update every 5 second.
 *
 **/
export default class MyToolIcon extends Component {
  state = {
    time: new Date()
  }
  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return(
      <img src={`https://api.netlify.com/api/v1/badges/f9cdb3ca-7131-4012-80d7-8484edc4d6fc/deploy-status?${this.state.time}`} />
    )
  }
}

