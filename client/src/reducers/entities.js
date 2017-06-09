import merge from 'lodash/merge'
const initialState = {orders: {}}

export default function entities (state = initialState, action) {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities)
  }
  return state
}
