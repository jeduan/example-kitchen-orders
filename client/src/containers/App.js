import React, { Component } from 'react'
import {connect} from 'react-redux'

import Orders from './Orders'
import Navigation from './Navigation'
import {initialize} from '../actions/app'

class App extends Component {
  componentDidMount () {
    this.props.initialize()
  }

  render () {
    return (
      <div className='App'>
        <Navigation />
        <Orders />
      </div>
    )
  }
}

export default connect(null, {initialize})(App)
