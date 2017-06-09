const makeRequest = (fn, type, process) => data => dispatch => {
  dispatch({type: `${type}_REQUEST`, payload: data})
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

export const getHostname = () => {
  if (process.env.NODE_ENV === 'test') {
    return 'http://localhost.test:3000'
  }
  const {host, protocol} = window.location
  return `${protocol}//${host}`
}

export default makeRequest
