import {combineReducers} from 'redux'
import orders from './orders'
import app from './app'
import entities from './entities'

export default combineReducers({
  orders,
  entities,
  app
})

export const isFetching = state => state.app.fetching
