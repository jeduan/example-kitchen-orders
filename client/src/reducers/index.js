import {combineReducers} from 'redux'
import orders from './orders'
import app from './app'
import entities from './entities'
import modal from './modal'

export default combineReducers({
  orders,
  entities,
  modal,
  app
})
