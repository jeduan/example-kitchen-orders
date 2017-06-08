import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

const middleware = [
  thunk
]
let composeEnhancers = compose

if (process.env.NODE_ENV === 'development') {
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    })
  }
}

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
)

export default (initialState = {}) => {
  return createStore(rootReducer, initialState, enhancer)
}
