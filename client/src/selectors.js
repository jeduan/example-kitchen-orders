import flow from 'lodash/fp/flow'
import map from 'lodash/fp/map'
import sortBy from 'lodash/fp/sortBy'
import clone from 'lodash/fp/clone'

export const isFetching = state => state.app.fetching
export const isModalOpen = state => state.modal.isOpen
export const isLoadingOrders = state => state.orders.isLoadingOrders

export const allOrders = state => {
  const process = flow(
    map(rawOrderFromId(state)),
    map(hidrateOrder),
    sortBy(['eta']),
    map(normalize)
  )
  return process(state.orders.result)
}

const rawOrderFromId = (state) => (id) => state.entities.orders[id]

const hidrateOrder = (orig) => {
  const ret = clone(orig)
  if (orig.eta) {
    ret.eta = new Date(orig.eta)
  }
  return ret
}

const normalize = (object) => ({
  key: object.id,
  data: clone(object)
})
