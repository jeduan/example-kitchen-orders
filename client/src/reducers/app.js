const initialState = {
  fetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'APP_INIT':
      return {
        fetching: true,
        ...state
      }
    case 'APP_HELP':
      return {
        fetching: false
      }
    default:
      return state
  }
}
