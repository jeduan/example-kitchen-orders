import React, { Component } from 'react'
import {connect} from 'react-redux'
import {initialize} from '../actions/app'

class App extends Component {
  componentDidMount () {
    this.props.initialize()
  }

  render () {
    return (
      <div className='App'>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default connect(null, {initialize})(App)
