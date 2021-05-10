import { on } from 'https://unpkg.com/anticore@latest/index.js'

on('main.congrats', element => {
  element.querySelector('h1').classList.add('success')
})
