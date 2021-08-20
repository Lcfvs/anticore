import { on } from 'anticore'

on('main.congrats', element => {
  element.querySelector('h1').classList.add('success')
})
