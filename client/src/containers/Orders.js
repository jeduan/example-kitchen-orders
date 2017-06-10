import React from 'react'
import { connect } from 'react-redux'

import { allOrders } from '../selectors'
import { pickup } from '../actions/orders'
import OrderCard from '../components/OrderCard'

const Orders = ({orders, pickup}) => (
  <div>
    {orders.map(order => (
      <OrderCard key={order.id}
        order={order}
        onPickup={() => pickup(order.id)}
      />
    ))}
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
