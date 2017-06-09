import request from 'request-promise-native'
import {normalize} from 'normalizr'
import {orderSchema} from '../schema'
import makeRequest, {getHostname} from './makeRequest'

const api = request.defaults({
  json: true,
  baseUrl: `${getHostname()}/orders`
})

const requestCreate = (body) => api.post('', {body})
const requestGetAll = () => api.get('')
const requestPickup = (id) => api.put(`/${id}/pickup`)
const normalizeOrderList = (payload) => normalize(payload, [orderSchema])
const normalizeOrder = (payload) => normalize(payload, orderSchema)
const requestData = (_, data) => data

export const getAll = makeRequest(requestGetAll, 'ORDERS_GET_ALL', normalizeOrderList)
export const create = makeRequest(requestCreate, 'ORDERS_CREATE', normalizeOrder)
export const pickup = makeRequest(requestPickup, 'ORDERS_PICKUP', requestData)
