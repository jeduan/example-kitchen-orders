import React from 'react'
import Button from './Button'
import { css } from 'glamor'

const h2 = css({
  margin: '0 0 20px',
  fontSize: 30,
  lineHeight: 1.3
})

const actions = css({
  textAlign: 'right'
})

const CloseKitchenDialog = ({onConfirm, onCancel, children, confirmText, cancelText, title}) => {
  return (
    <div>
      {title && (
        <h2 {...h2}>{title}</h2>
      )}
      <div {...actions}>
        <Button onClick={onCancel}>{cancelText || 'Cancel'}</Button>&nbsp;
        <Button danger onClick={onConfirm}>{confirmText || 'YES'}</Button>
      </div>
    </div>
  )
};

export default CloseKitchenDialog
