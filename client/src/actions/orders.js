import request from 'request-promise-native'
import {normalize} from 'normalizr'
import {orderSchema} from '../schema'

const {host, protocol} = window.location
const localhost = `${protocol}//${host}`

const api = request.defaults({json: true, baseUrl: `${localhost}/orders`})

export const requestCreate = (body) => api.post('', {body})
export const requestGetAll = () => api.get('')
export const requestPickup = (id) => api.put(`/${id}/pickup`)

const makeRequest = (fn, type, schema) => data => dispatch => {
  dispatch({type: `${type}_REQUEST`})
  fn(data)
    .then((payload) => {
      if (schema) {
        payload = normalize(payload, schema)
      }

      dispatch({
        type: `${type}_SUCCESS`,
        payload
      })
    })
    .catch((err) => {
      console.error(err)
      dispatch({
        type: `${type}_FAIL`,
        error: true,
        payload: err
      })
    })
}

export const create = makeRequest(requestCreate, 'ORDERS_CREATE', orderSchema)
export const getAll = makeRequest(requestGetAll, 'ORDERS_GET_ALL', [orderSchema])
export const pickup = makeRequest(requestPickup, 'ORDERS_PICKUP')
