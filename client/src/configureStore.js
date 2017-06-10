import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

const middleware = [
  thunk,
  process.env.NODE_ENV !== 'production' && createLogger({
    collapsed: true
  })
].filter(m => !!m)

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
