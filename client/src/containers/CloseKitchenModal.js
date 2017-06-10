import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import Dialog from '../components/Dialog'
import { css } from 'glamor'
import { isModalOpen } from '../selectors'
import { closeModal } from '../actions/modal'
import { closeKitchen } from '../actions/app'

css.global('.ReactModal__Body--open', {
  overflow: 'hidden'
})

const customStyle = {
  overlay: {
    zIndex: 10
  },
  content: {
    border: 'none',
    borderRadius: 0
  }
}

class CloseKitchenModal extends Component {
  render () {
    return (
      <Modal isOpen={this.props.isModalOpen}
        contentLabel='Close Kitchen?'
        style={customStyle}
      >
        <Dialog
          onCancel={this.props.closeModal}
          onConfirm={this.props.closeKitchen}
          confirmText='Close Kitchen'
        >
          <h3>Are you sure you want to close the kitchen?</h3>
        </Dialog>
      </Modal>
    )
  }
}

export default connect(
  (state) => ({
    isModalOpen: isModalOpen(state)
  }),
  {
    closeModal,
    closeKitchen
  }
)(CloseKitchenModal)
