import * as orders from './orders'

const init = () => ({type: 'APP_INIT'})
const help = () => ({type: 'APP_HELP'})

let interval
export const startFetching = (rate = 15000) => (dispatch, getState) => {
  if (interval) {
    return
  }
  console.log('starting interval')
  interval = setInterval(() => {
    dispatch(orders.create())
  }, rate)
}

export const stopFetching = () => dispatch => {
  if (!interval) {
    return
  }
  console.log('clearing interval')
  clearInterval(interval)
  interval = null
  dispatch(help())
}

export const initialize = () => dispatch => {
  dispatch(init())
  dispatch(orders.getAll())
  dispatch(startFetching())
}
