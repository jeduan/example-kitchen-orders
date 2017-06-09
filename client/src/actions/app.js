import * as orders from './orders'

const init = () => ({type: 'APP_INIT'})
export const help = () => ({type: 'APP_HELP'})

export const initialize = () => dispatch => {
  dispatch(init())
  dispatch(orders.getAll())
}
