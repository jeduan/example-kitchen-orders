import { css } from 'glamor'

css.global('body', {
  width: '100vw',
  height: '100vh',
  margin: 0,
  padding: 0
})

css.global('html', {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontSize: 16,
  fontWeight: 'normal',
  lineHeight: 1.5
})

css.global('h2, h3, h4, h5, h6', {
  margin: '0 0 20px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontWeight: 300,
  color: '#222'
})
