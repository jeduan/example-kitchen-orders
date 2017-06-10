import React, { Component } from 'react'
import {connect} from 'react-redux'
import { css } from 'glamor'
import CloseKitchenModal from './CloseKitchenModal'

import Orders from './Orders'
import Navigation from './Navigation'
import {initialize} from '../actions/app'

const container = css({
  padding: '0 15px',
  margin: '0 auto',
  maxWidth: 1380
})

class App extends Component {
  componentDidMount () {
    this.props.initialize()
  }

  render () {
    return (
      <div {...container}>
        <Navigation />
        <Orders />
        <CloseKitchenModal />
      </div>
    )
  }
}

export default connect(null, {initialize})(App)
