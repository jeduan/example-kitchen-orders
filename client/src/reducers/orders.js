
const initialState = {
  result: [],
  isLoading: false,
  isLoadingOrders: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ORDERS_GET_ALL_SUCCESS':
      return {
        ...state,
        result: action.payload.result,
        isLoading: false,
        isLoadingOrders: false
      }

    case 'ORDERS_GET_ALL_FAIL':
      return {
        ...state,
        isLoadingOrders: false
      }

    case 'ORDERS_GET_ALL_REQUEST': {
      return {
        ...state,
        isLoadingOrders: true
      }
    }

    case 'ORDERS_CREATE_SUCCESS':
      return {
        ...state,
        result: [action.payload.result, ...state.result],
        isLoading: false
      }

    case 'ORDERS_PICKUP_SUCCESS':
      return {
        ...state,
        result: state.result.filter(id => id !== action.payload),
        isLoading: false
      }

    default:
      if (/^ORDERS_.*_REQUEST$/.test(action.type)) {
        return {
          ...state,
          isLoading: true
        }
      }
      if (/^ORDERS_.*_(SUCCESS|FAIL)$/.test(action.type)) {
        return {
          ...state,
          isLoading: false
        }
      }
      return state
  }
}
