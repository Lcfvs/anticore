import { on } from 'https://unpkg.com/anticore@latest/index.js'

// matching any received .error[data-target]
on('.anticore > .error[data-target]', element => {
  // retrieving the field in the document
  const { parentNode } = document.querySelector(element.dataset.target)

  parentNode.append(element)
})
