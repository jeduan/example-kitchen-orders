import { StatusCodeError, TransformError, RequestError } from 'request-promise-native/errors'

const makeRequest = (fn, type, process) => data => async (dispatch) => {
  dispatch({type: `${type}_REQUEST`, payload: data})
  let payload

  try {
    payload = await fn(data)
  } catch (err) {
    if (!(err instanceof StatusCodeError ||
      err instanceof TransformError ||
      err instanceof RequestError)) {
      throw err
    }

    dispatch({
      type: `${type}_FAIL`,
      error: true,
      payload: err
    })
    return
  }

  if (process && typeof process === 'function') {
    payload = process(payload, data)
  }
  dispatch({
    type: `${type}_SUCCESS`,
    payload
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
