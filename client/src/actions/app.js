import * as orders from './orders'
import {closeModal} from './modal'

export const init = () => ({type: 'APP_INIT'})
export const start = () => ({type: 'APP_START_FETCHING'})
export const stop = () => ({type: 'APP_STOP_FETCHING'})

export let interval
export const startFetching = ({rate = 15000} = {}) => (dispatch) => {
  if (interval) {
    return
  }
  dispatch(start())
  interval = setInterval(() => {
    dispatch(orders.create())
  }, rate)
}

export const stopFetching = () => dispatch => {
  if (!interval) {
    return
  }
  clear()
  dispatch(stop())
}

export const closeKitchen = () => dispatch => {
  dispatch(stopFetching())
  dispatch(closeModal())
}

export const initialize = () => dispatch => {
  dispatch(init())
  dispatch(startFetching())
  dispatch(orders.getAll())
}

export const clear = () => {
  if (!interval) {
    return
  }
  clearInterval(interval)
  interval = null
}
