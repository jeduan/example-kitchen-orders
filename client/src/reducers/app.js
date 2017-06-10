const initialState = {
  fetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'APP_START_FETCHING':
      return {
        ...state,
        fetching: true
      }
    case 'APP_STOP_FETCHING':
      return {
        ...state,
        fetching: false
      }
    default:
      return state
  }
}
