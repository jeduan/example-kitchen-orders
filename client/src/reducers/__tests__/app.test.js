/* eslint-env jest */
import appReducer from '../app'

it('APP_START_FETCHING', () => {
  const action = {type: 'APP_START_FETCHING'}
  const nextState = appReducer(null, action)
  expect(nextState).toEqual({fetching: true})
})

it('APP_STOP_FETCHING', () => {
  const state = {fetching: true}
  const action = {type: 'APP_STOP_FETCHING'}

  const nextState = appReducer(state, action)
  expect(nextState).toEqual({fetching: false})
})

it('ignores other actions', () => {
  const state = {fetching: true}
  const action = {type: 'FOO'}

  const nextState = appReducer(state, action)
  expect(nextState).toEqual(state)
})

