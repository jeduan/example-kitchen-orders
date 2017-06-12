/* eslint-env jest */

import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actions from '../app'

const middlewares = [thunk]
const mockStore = createMockStore(middlewares)

jest.useFakeTimers()

afterEach(() => {
  actions.clear()
  jest.clearAllTimers()
})

it('should start fetching on initialize', () => {
  const store = mockStore()
  const expectedActions = [
    actions.init(),
    actions.start(),
    {type: 'ORDERS_GET_ALL_REQUEST'}
  ]

  store.dispatch(actions.initialize())
  expect(store.getActions()).toEqual(expectedActions)
})

it('should create an order after 15 secs', () => {
  const store = mockStore()
  const expectedActions = [
    actions.start(),
    {type: 'ORDERS_CREATE_REQUEST'}
  ]

  const currentCalls = setInterval.mock.calls.length
  store.dispatch(actions.startFetching())
  expect(store.getActions()).toEqual(expectedActions.slice(0, 1))
  expect(setInterval.mock.calls.length).toBe(currentCalls + 1)

  jest.runTimersToTime(15000)
  expect(store.getActions()).toEqual(expectedActions)
})

it('should stop the interval', () => {
  const store = mockStore()
  const expectedActions = [
    actions.stop()
  ]

  store.dispatch(actions.startFetching())
  store.clearActions()

  store.dispatch(actions.stopFetching())

  expect(store.getActions()).toEqual(expectedActions)
})

it('close kitchen should close the modal', () => {
  const store = mockStore()
  const expectedActions = [
    actions.stop(),
    {type: 'MODAL_CLOSE'}
  ]

  store.dispatch(actions.startFetching())
  store.clearActions()

  store.dispatch(actions.closeKitchen())
  expect(store.getActions()).toEqual(expectedActions)
})

it('should not start two timers', () => {
  const store = mockStore()

  store.dispatch(actions.startFetching())
  const initialInterval = actions.interval

  store.dispatch(actions.startFetching())
  expect(actions.interval).toEqual(initialInterval)
})
