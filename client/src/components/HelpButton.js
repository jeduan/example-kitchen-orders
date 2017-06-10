import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const HelpButton = ({onHelpClick, children, ...props}) => {
  return (
    <Button danger onClick={onHelpClick} {...props}>
      {children}
    </Button>
  )
}

HelpButton.propTypes = {
  onHelpClick: PropTypes.func.isRequired
}

export default HelpButton
