import React from 'react'
import { css } from 'glamor'
import Button from './Button'
import TimeDistance from './TimeDistance'

const card = css(
  {
    boxSizing: 'border-box',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
    margin: '0 auto',
    maxWidth: 400
  },
  {
    '& p': {
      margin: '0 0 10px'
    },
    '& h3': {
      color: '#222',
      fontSize: 24,
      lineHeight: 1.4
    },
    '& h4, & h5': {
      margin: '0 0 10px'
    }
  }
)

const container = css({
  position: 'relative',
  padding: 30,
  color: '#666'
})

const action = css({
  position: 'absolute',
  top: 30,
  right: 30,
  zIndex: 1
})

const OrderCard = ({order, onPickup, style}) => (
  <div {...card} style={style}>
    <div {...container}>
      <h4>Order #{order.id}</h4>
      <h3><TimeDistance date={order.eta} /></h3>
      <h5>Courier: {order.courier}</h5>
      <p>
        {order.name}<br />
        {order.address}<br />
        <Button {...action}
          onClick={onPickup}
        >Pick up</Button>
      </p>
    </div>
  </div>
)

export default OrderCard
