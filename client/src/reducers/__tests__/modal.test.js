/* eslint-env jest */

import modalReducer from '../modal'

it('MODAL_OPEN sets the modal open', () => {
  const action = {type: 'MODAL_OPEN'}
  const nextState = modalReducer(null, action)
  expect(nextState).toEqual({isOpen: true})
})

it('MODAL_CLOSE sets the modal', () => {
  const state = {isOpen: true}
  const action = {type: 'MODAL_CLOSE'}

  const nextState = modalReducer(state, action)
  expect(nextState).toEqual({isOpen: false})
})

it('ignores other actions', () => {
  const state = {isOpen: true}
  const action = {type: 'FOO'}

  const nextState = modalReducer(state, action)
  expect(nextState).toEqual(state)
})
