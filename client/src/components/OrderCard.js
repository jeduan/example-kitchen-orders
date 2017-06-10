import React, { Component } from 'react'
import fromNow from 'date-fns/distance_in_words_to_now'
import { css, media, select as $ } from 'glamor'
import Button from './Button'

const card = css(
  {
    boxSizing: 'border-box',
    position: 'relative',
    backgroundColor: 'white',
    color: '#666',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
    padding: 30,
    margin: '0 auto 30px'
  },
  media('(min-width: 640px)', {
    width: '50%'
  }),
  $('& p', {
    margin: '0 0 10px'
  }),
  $('& h3', {
    color: '#222',
    fontSize: 24,
    lineHeight: 1.4,
    margin: '0 0 20px'
  }),
  $('& h4', {
    margin: '0 0 10px'
  })
)

const action = css({
  position: 'absolute',
  top: 30,
  right: 30,
  zIndex: 1
})

class OrderCard extends Component {
  render () {
    return (
      <div {...card}>
        <h4>Order #{this.props.order.id}</h4>
        <h3>{fromNow(this.props.order.eta)}</h3>
        <p>
          <b>Courier: {this.props.order.courier}</b><br />
          {this.props.order.name}<br />
          {this.props.order.address}<br />
          <Button glamor={action} primary
            onClick={() => this.props.onPickup(this.props.order.id)}
          >Pick up</Button>
        </p>
      </div>
    )
  }
}

export default OrderCard
