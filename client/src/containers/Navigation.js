import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'
import HelpButton from '../components/HelpButton'
import Button from '../components/Button'
import { startFetching, stopFetching } from '../actions/app'

const style = css({
  maxWidth: 800,
  padding: '10px 0',
  margin: '0 auto 20px',
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'flex-end',
  '& > button': {
    marginLeft: 20
  }
})

const Navigation = ({startFetching, stopFetching}) => (
  <div {...style} >
    <Button onClick={startFetching} >Start</Button>
    <HelpButton onHelpClick={stopFetching} />
  </div>
)

export default connect(null, {
  startFetching, stopFetching
})(Navigation)
