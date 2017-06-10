import React from 'react'
import Button from './Button'

const CloseKitchenDialog = ({onConfirm, onCancel, children, confirmText, cancelText}) => {
  return (
    <div>
      {children}
      <div>
        <Button danger onClick={onConfirm}>{confirmText || 'YES'}</Button>
        <Button primary onClick={onCancel}>{cancelText || 'Cancel'}</Button>
      </div>
    </div>
  )
};

export default CloseKitchenDialog
