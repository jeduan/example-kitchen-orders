import request from 'request-promise-native'

const {host, protocol} = window.location
const localhost = `${protocol}//${host}`

const api = request.defaults({json: true, baseUrl: `${localhost}/orders`})

export const requestCreate = (body) => api.post('', {body})
export const requestGetAll = () => api.get('')
export const requestPickup = (id) => api.put(`/${id}/pickup`)

const makeRequest = (fn, type) => data => dispatch => {
  dispatch({type: `${type}_REQUEST`})
  fn(data)
    .then((payload) => dispatch({
      type: `${type}_SUCCESS`,
      payload
    }))
    .catch((err) => dispatch({
      type: `${type}_ERROR`,
      error: true,
      payload: err
    }))
}

export const create = makeRequest(requestCreate, 'ORDERS_CREATE')
export const getAll = makeRequest(requestGetAll, 'ORDERS_GET_ALL')
export const pickup = makeRequest(requestPickup, 'ORDERS_PICKUP')
