import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TransitionMotion, spring, presets } from 'react-motion'
import map from 'lodash/fp/map'

import { allOrders, isLoadingOrders } from '../selectors'
import { pickup } from '../actions/orders'
import OrderCard from '../components/OrderCard'

const addDefaultStyle = (order) => ({
  ...order,
  style: { height: 0, opacity: 1, marginBottom: 0 }
})

const addFinalStyle = (order) => ({
  ...order,
  style: {
    height: spring(234, presets.gentle),
    opacity: spring(1, presets.gentle),
    marginBottom: spring(30, presets.gentle)
  }
})

class Orders extends Component {
  getDefaultStyles () {
    const defaultStyles = map(addDefaultStyle, this.props.orders)
    console.log('DEFAULT STYLES')
    return defaultStyles
  }

  getStyles () {
    console.log('FINAL STYLES')
    return map(addFinalStyle, this.props.orders)
  }

  handleLeave = (leavingItem) => {
    console.log('LEAVING', leavingItem)
    return {
      height: spring(0, presets.gentle),
      opacity: spring(0, presets.gentle),
      marginBottom: spring(0, presets.gentle)
    }
  }

  handleEnter = () => ({
    height: 0,
    opacity: 1,
    marginBottom: 30
  })

  render () {
    if (this.props.isLoading) {
      return (
        <h3>Loading</h3>
      )
    }

    const {orders, pickup} = this.props

    if (orders.length === 0) {
      return (
        <h3>No orders yet</h3>
      )
    }

    return (
      <TransitionMotion
        defaultStyles={this.getDefaultStyles()}
        styles={this.getStyles()}
        willLeave={this.handleLeave}
        willEnter={this.handleEnter}
      >
        { styles => (
          <div>
            { styles.map((style) => (
              <OrderCard key={style.key}
                order={style.data}
                onPickup={() => pickup(style.data.id)}
                style={style.style}
              />
            )) }
          </div>
        )}
      </TransitionMotion>
    )
  }
}


export default connect(
  (state) => ({
    orders: allOrders(state),
    isLoading: isLoadingOrders(state)
  }),
  {
    pickup
  }
)(Orders)
