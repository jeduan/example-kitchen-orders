/* eslint-env jest */

import nock from 'nock'
import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actions from './orders'
import { normalize } from 'normalizr'
import {orderSchema} from '../schema'

const middlewares = [thunk]
const mockStore = createMockStore(middlewares)

afterEach(() => {
  nock.cleanAll()
})

it('creates ORDERS_GET_ALL_SUCCESS', () => {
  const store = mockStore()
  const body = [{
    id: '0001',
    name: 'foo'
  }]

  nock('http://localhost.test:3000')
    .get('/orders')
    .reply(200, body)

  const expectedActions = [{
    type: 'ORDERS_GET_ALL_REQUEST'
  }, {
    type: 'ORDERS_GET_ALL_SUCCESS',
    payload: normalize(body, [orderSchema])
  }]

  return store.dispatch(actions.getAll())
    .then(() => {
      expect(store.getActions())
        .toEqual(expectedActions)
    })
})

it('creates ORDERS_GET_ALL_ERROR', () => {
  const store = mockStore()
  const expectedActions = [{
    type: 'ORDERS_GET_ALL_REQUEST'
  }, {
    type: 'ORDERS_GET_ALL_FAIL',
    error: true
  }]

  nock('http://localhost.test:3000')
    .get('/orders')
    .reply(500)

  return store.dispatch(actions.getAll())
    .then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual(expectedActions[0])
      expect(actions[1].type).toEqual(expectedActions[1].type)
      expect(actions[1]).toHaveProperty('error', true)
      expect(actions[1].payload.name).toEqual('StatusCodeError')
      expect(actions[1].payload.statusCode).toEqual(500)
    })
})

it('creates ORDERS_CREATE_SUCCESS', () => {
  const store = mockStore()
  const body = {
    id: '0001',
    name: 'foo'
  }

  nock('http://localhost.test:3000')
    .post('/orders')
    .reply(200, body)

  const expectedActions = [{
    type: 'ORDERS_CREATE_REQUEST'
  }, {
    type: 'ORDERS_CREATE_SUCCESS',
    payload: normalize(body, orderSchema)
  }]

  return store.dispatch(actions.create())
    .then(() => {
      expect(store.getActions())
        .toEqual(expectedActions)
    })
})

it('creates ORDERS_PICKUP_SUCCESS', () => {
  const store = mockStore()

  nock('http://localhost.test:3000')
    .put('/orders/0001/pickup')
    .reply(200)

  const expectedActions = [{
    type: 'ORDERS_PICKUP_REQUEST'
  }, {
    type: 'ORDERS_PICKUP_SUCCESS',
    payload: '0001'
  }]

  return store.dispatch(actions.pickup('0001'))
    .then(() => {
      expect(store.getActions())
        .toEqual(expectedActions)
    })
})
