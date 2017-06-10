import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'
import HelpButton from '../components/HelpButton'
import Button from '../components/Button'
import { startFetching } from '../actions/app'
import { openModal } from '../actions/modal'
import { isFetching } from '../selectors'

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

const Navigation = ({isFetching, startFetching, openModal}) => (
  <div {...style}>
    <Button disabled={isFetching} onClick={startFetching} >Start</Button>
    <HelpButton disabled={!isFetching} onHelpClick={openModal} >Help</HelpButton>
  </div>
)

export default connect(
  (state) => ({
    isFetching: isFetching(state)
  }), {
    startFetching, openModal
  }
)(Navigation)
