import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button';

const HelpButton = ({onHelpClick}) => {
  return (
    <Button danger onClick={onHelpClick}>
      Help
    </Button>
  )
}

HelpButton.propTypes = {
  onHelpClick: PropTypes.func.isRequired
}

export default HelpButton
