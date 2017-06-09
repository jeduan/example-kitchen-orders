
const initialState = {
  result: [],
  isLoading: false
}

export default (state = initialState, action) => {
  if (/^ORDERS_.*_REQUEST$/.test(action.type)) {
    return {
      ...state,
      isLoading: true
    }
  }

  switch (action.type) {
    case 'ORDERS_GET_ALL_SUCCESS':
      return {
        ...state,
        result: action.payload.result,
        isLoading: false
      }

    case 'ORDERS_CREATE_SUCCESS':
      return {
        ...state,
        result: [...action.payload.result, ...state.result],
        isLoading: false
      }

    case 'ORDERS_PICKUP_SUCCESS':
      return {
        ...state,
        result: state.result.filter(id => id !== action.payload),
        isLoading: false
      }

    default:
      if (/^ORDERS_.*_(SUCCESS|FAIL)$/.test(action.type)) {
        return {
          ...state,
          isLoading: false
        }
      }
      return state
  }
}
