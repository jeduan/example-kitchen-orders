import React from 'react'
import { connect } from 'react-redux'
import HelpButton from '../components/HelpButton'
import { startFetching, stopFetching } from '../actions/app'

const Navigation = ({startFetching, stopFetching}) => (
  <div className='Navigation' >
    <button onClick={startFetching} >Start</button>
    <HelpButton onHelpClick={stopFetching} />
  </div>
)

export default connect(null, {
  startFetching, stopFetching
})(Navigation)
