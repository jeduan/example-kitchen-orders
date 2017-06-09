/* eslint-env jest */

import ordersReducer from './orders'

it('ORDERS_*_REQUEST sets isLoading: true', () => {
  const action = {type: 'ORDERS_A_REQUEST'}
  const nextState = ordersReducer({isLoading: false}, action)
  expect(nextState.isLoading).toBe(true)
})

it('ORDERS_*_SUCCESS sets isLoading: false', () => {
  const action = {type: 'ORDERS_A_SUCCESS'}
  const nextState = ordersReducer({isLoading: true}, action)
  expect(nextState.isLoading).toBe(false)
})

it('ORDERS_*_FAIL sets isLoading: false', () => {
  const action = {type: 'ORDERS_A_FAIL'}
  const nextState = ordersReducer({isLoading: true}, action)
  expect(nextState.isLoading).toBe(false)
})

it('ORDERS_GET_ALL_SUCCESS stores results', () => {
  const action = {
    type: 'ORDERS_GET_ALL_SUCCESS',
    payload: {
      result: ['0001', '0002']
    }
  }

  const nextState = ordersReducer(null, action)

  expect(nextState.result).toEqual(['0001', '0002'])
  expect(nextState.isLoading).toBe(false)
})

it('ORDERS_GET_ALL_SUCCESS ignores previous ids', () => {
  const action = {
    type: 'ORDERS_GET_ALL_SUCCESS',
    payload: {
      result: ['0001', '0002']
    }
  }
  const nextState = ordersReducer({result: ['foobar']}, action)
  expect(nextState.result).toEqual(['0001', '0002'])
})

it('ORDERS_CREATE_SUCCESS stores new id', () => {
  const action = {
    type: 'ORDERS_CREATE_SUCCESS',
    payload: {
      result: ['0001']
    }
  }
  const nextState = ordersReducer({result: ['0002']}, action)
  expect(nextState.result).toEqual(['0001', '0002'])
  expect(nextState.isLoading).toBe(false)
})

it('ORDERS_PICKUP_SUCCESS removes the id', () => {
  const action = {
    type: 'ORDERS_PICKUP_SUCCESS',
    payload: '0001'
  }
  const state = {
    result: ['0001', '0002'],
    isLoading: true
  }

  const nextState = ordersReducer(state, action)
  expect(nextState.isLoading).toBe(false)
  expect(nextState.result).toEqual(['0002'])
})
