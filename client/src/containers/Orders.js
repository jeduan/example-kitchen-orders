import React, { Component } from 'react'
import { connect } from 'react-redux'
import { allOrders } from '../selectors'
import { pickup } from '../actions/orders'
import OrderCard from '../components/OrderCard'

class Orders extends Component {
  render () {
    return (
      <div className='Orders'>
        {this.props.orders.map(order => (
          <OrderCard key={order.id} order={order} onPickup={this.props.pickup} />
        ))}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    orders: allOrders(state)
  }),
  {
    pickup
  }
)(Orders)
