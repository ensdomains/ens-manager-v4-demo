import { globalStyle, style } from '@vanilla-extract/css'

export const nav = style({
  display: 'flex',
  gap: '10px',
})

globalStyle(`${nav} a`, {
  textDecoration: 'none',
})

globalStyle(`${nav} a:hover`, {
  textDecoration: 'underline',
})
