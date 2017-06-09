import React, { Component } from 'react'
import { connect } from 'react-redux'
import HelpButton from '../components/HelpButton'
import { startFetching, stopFetching } from '../actions/app'

class Navigation extends Component {
  render () {
    return (
      <div className='Navigation' >
        <button onClick={this.props.startFetching} >Start</button>
        <HelpButton onHelpClick={this.props.stopFetching} />
      </div>
    )
  }
}

export default connect(null, {
  startFetching, stopFetching
})(Navigation)
