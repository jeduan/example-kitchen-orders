import request from 'request-promise-native'
import {normalize} from 'normalizr'
import {orderSchema} from '../schema'

const getHostname = () => {
  if (process.env.NODE_ENV === 'test') {
    return 'http://localhost.test:3000'
  }
  const {host, protocol} = window.location
  return `${protocol}//${host}`
}

const api = request.defaults({json: true, baseUrl: `${getHostname()}/orders`})

const requestCreate = (body) => api.post('', {body})
const requestGetAll = () => api.get('')
const requestPickup = (id) => api.put(`/${id}/pickup`)

const makeRequest = (fn, type, process) => data => dispatch => {
  dispatch({type: `${type}_REQUEST`})
  return fn(data)
    .then((payload) => {
      if (process && typeof process === 'function') {
        payload = process(payload, data)
      }

      dispatch({
        type: `${type}_SUCCESS`,
        payload
      })
    })
    .catch((err) => {
      dispatch({
        type: `${type}_FAIL`,
        error: true,
        payload: err
      })
    })
}

const normalizeOrderList = (payload) => normalize(payload, [orderSchema])
const normalizeOrder = (payload) => normalize(payload, orderSchema)
const requestData = (_, data) => data

export const getAll = makeRequest(requestGetAll, 'ORDERS_GET_ALL', normalizeOrderList)
export const create = makeRequest(requestCreate, 'ORDERS_CREATE', normalizeOrder)
export const pickup = makeRequest(requestPickup, 'ORDERS_PICKUP', requestData)
