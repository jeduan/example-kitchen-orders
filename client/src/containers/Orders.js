import React, { Component } from 'react'
import { connect } from 'react-redux'
import { allOrders } from '../selectors'

class Orders extends Component {
  render () {
    return (
      <div className='Orders'>
        <pre>
          {JSON.stringify(this.props.orders, null, '  ')}
        </pre>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    orders: allOrders(state)
  })
)(Orders)
