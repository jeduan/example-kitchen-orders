import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const HelpButton = ({onClick, children, ...props}) => {
  return (
    <Button primary onClick={onClick} {...props}>
      {children}
    </Button>
  )
}

HelpButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default HelpButton
