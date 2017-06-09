import * as orders from './orders'
import { isFetching } from '../reducers'

const init = () => ({type: 'APP_INIT'})
const help = () => ({type: 'APP_HELP'})
const rate = 3000

let interval
const startInterval = (rate) => (dispatch, getState) => {
  interval = setInterval(() => {
    console.log('starting interval')
    const state = getState()
    if (!isFetching(state)) {
      stopInterval()
      return
    }
    dispatch(orders.create())
  }, rate)
}

function stopInterval () {
  console.log('clearing interval')
  clearInterval(interval)
  interval = null
}

export const stopFetching = () => dispatch => {
  stopInterval()
  dispatch(help())
}

export const initialize = () => dispatch => {
  dispatch(init())
  dispatch(orders.getAll())
  dispatch(startInterval(rate))
  setTimeout(() => dispatch(stopFetching()), 7000)
}
