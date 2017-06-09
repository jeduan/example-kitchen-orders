import React from 'react'
import PropTypes from 'prop-types'

const HelpButton = ({onHelpClick}) => {
  return (
    <button className='help' onClick={onHelpClick}>
      Stop
    </button>
  )
}

HelpButton.propTypes = {
  onHelpClick: PropTypes.func.isRequired
}

export default HelpButton
