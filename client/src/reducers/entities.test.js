/* eslint-env jest */

import entitiesReducer from './entities'

it('should store entities', () => {
  const action = {
    payload: {
      entities: {
        foo: {
          id: 'foo'
        }
      }
    }
  }
  const nextState = entitiesReducer(null, action)
  expect(nextState).toHaveProperty('foo')
  expect(nextState).toHaveProperty('foo.id', 'foo')
})

it('should append new entities', () => {
  const action = {
    payload: {
      entities: {
        foo: {
          id: 'foo'
        }
      }
    }
  }
  const state = {
    bar: {
      id: 'bar'
    }
  }

  const nextState = entitiesReducer(state, action)
  expect(nextState).toHaveProperty('foo')
  expect(nextState).toHaveProperty('foo.id', 'foo')
  expect(nextState).toHaveProperty('bar')
  expect(nextState).toHaveProperty('bar.id', 'bar')
})
