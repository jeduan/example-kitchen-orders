import React, { Component } from 'react'
import PropTypes from 'prop-types'
import distance from 'date-fns/distance_in_words'

const oneMinute = 1000 * 60

class TimeDistance extends Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired
  };

  constructor (props) {
    super(props)
    this.state = {
      distance: this.calc(props.date)
    }
  }

  componentDidMount () {
    this.timerId = setInterval(this.tick, oneMinute)
  }

  componentWillUnmount () {
    clearInterval(this.timerId)
  }

  tick = () => {
    this.setState((state, props) => ({
      distance: this.calc(props.date)
    }))
  }

  calc (date) {
    return distance(new Date(), date)
  }

  render () {
    return (
      <span>{this.state.distance}</span>
    )
  }
}

export default TimeDistance
