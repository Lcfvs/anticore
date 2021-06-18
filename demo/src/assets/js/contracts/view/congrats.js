import { on } from '../../anticore.js'

on('main.congrats', element => {
  element.querySelector('h1').classList.add('success')
})
