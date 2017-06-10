import flow from 'lodash/fp/flow'
import map from 'lodash/fp/map'
import sortBy from 'lodash/fp/sortBy'

export const isFetching = state => state.app.fetching
export const isModalOpen = state => state.modal.isOpen

export const allOrders = state => {
  const process = flow(
    map(rawOrderFromId(state)),
    map(hidrateOrder),
    sortBy(['eta'])
  )
  return process(state.orders.result)
}

const rawOrderFromId = (state) => (id) => state.entities.orders[id]

const hidrateOrder = (raw) => ({
  ...raw,
  eta: raw.eta && new Date(raw.eta)
})
