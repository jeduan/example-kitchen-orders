import {combineReducers} from 'redux'
import orders from './orders'
import app from './app'

export default combineReducers({
  orders,
  app
})
