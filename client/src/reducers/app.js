const initialState = {
  fetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'APP_INIT':
      return {
        ...state,
        fetching: true
      }
    case 'APP_HELP':
      return {
        ...state,
        fetching: false
      }
    default:
      return state
  }
}
