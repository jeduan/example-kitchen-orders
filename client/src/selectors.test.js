/* eslint-env jest */

import addMinutes from 'date-fns/add_minutes'
import * as selectors from './selectors'

it('should get all orders', () => {
  const state = {
    entities: {
      orders: {
        '0001': {
          id: '0001'
        }
      }
    },
    orders: {
      result: ['0001']
    }
  }

  const result = selectors.allOrders(state)
  expect(result).toEqual([{id: '0001'}])
})

it('should get orders sorted by ETA', () => {
  const now = new Date()
  const state = {
    entities: {
      orders: {
        '0001': {
          id: '0001',
          eta: addMinutes(now, 2)
        },
        '0002': {
          id: '0002',
          eta: addMinutes(now, 1)
        }
      }
    },
    orders: {
      result: ['0001', '0002']
    }
  }

  const result = selectors.allOrders(state)
  expect(result).toEqual([{
    id: '0002', eta: addMinutes(now, 1)
  }, {
    id: '0001', eta: addMinutes(now, 2)
  }])
})
