import React from 'react'
import { connect } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'
import { css } from 'glamor'

import { allOrders } from '../selectors'
import { pickup } from '../actions/orders'
import OrderCard from '../components/OrderCard'

const animations = css({
  '&.enter': {
    opacity: 0,
    transform: `translateX(-250px)`
  },
  '&.enter-active': {
    opacity: 1,
    transform: 'none',
    transitionProperty: 'transform, opacity',
    transitionDuration: '300ms',
    transitionTimingFunction: 'cubic-bezier(0.175, 0.665, 0.320, 1), linear'
  },
  '&.leave': {
    opacity: 1,
    transform: 'none'
  },
  '&.leave.leave-active': {
    opacity: 0,
    transform: 'translateX(250px)',
    transitionProperty: 'transform, opacity',
    transitionDuration: '300ms',
    transitionTimingFunction: 'cubic-bezier(0.175, 0.665, 0.320, 1), linear'
  }
})

const Orders = ({orders, pickup}) => (
  <div>
    <CSSTransitionGroup
      transitionName={{
        enter: 'enter',
        leave: 'leave',
        enterActive: 'enter-active',
        leaveActive: 'leave-active'
      }}
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
    >
      {orders.map(order => (
        <OrderCard key={order.id}
          order={order}
          onPickup={() => pickup(order.id)}
          {...animations}
        />
      ))}
    </CSSTransitionGroup>
  </div>
)

export default connect(
  (state) => ({
    orders: allOrders(state)
  }),
  {
    pickup
  }
)(Orders)
