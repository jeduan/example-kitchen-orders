import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

const isDev = process.env.NODE_ENV === 'development'
const isNotProd = process.env.NODE_ENV !== 'production'

const middleware = [
  thunk,
  isNotProd && createLogger({
    collapsed: true
  })
].filter(m => !!m)

let composeEnhancers = compose

if (isDev) {
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
