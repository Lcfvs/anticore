import { listen, on } from 'https://unpkg.com/anticore@latest/index.js'

function highlight ({ target: { classList }, type }) {
  if (type === 'input') {
    classList.add('highlighted')
  } else {
    classList.remove('highlighted')
  }
}

on('form input, form select, form textarea', element => {
  listen('input', element, highlight, { passive: true })
  listen('blur', element, highlight, { passive: true })
})
