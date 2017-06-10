import React from 'react'
import classnames from 'classnames'
import { css, select as $ } from 'glamor'

const button = css(
  {
    margin: 0,
    border: '1px solid #e5e5e5',
    backgroundColor: 'transparent',
    overflow: 'visible',
    font: 'inherit',
    color: '#222',
    cursor: 'pointer',
    display: 'inline-block',
    textTransform: 'uppercase',
    boxSizing: 'border-box',
    padding: '0 30px',
    verticalAlign: 'middle',
    fontSize: 14,
    lineHeight: '38px',
    textAlign: 'center',
    textDecoration: 'none',
    transition: '.1s ease-in-out',
    transitionProperty: 'color, background-color, border-color',
    '&:hover': {
      color: '#222',
      borderColor: '#b2b2b2'
    }
  },
  $('&.primary', {
    backgroundColor: '#1e87f0',
    color: '#fff',
    border: '1px solid transparent',
    '&:hover': {
      backgroundColor: '#0f7ae5'
    }
  })
)

const Button = ({children, onClick, primary, glamor}) => {
  const classNames = classnames({
    'primary': primary
  })
  return (
    <button onClick={onClick} {...button} {...glamor} className={classNames}>{children}</button>
  )
}

export default Button
