import { on, sse } from '../../anticore.js'

// matching any sse target and turn it to EventSource
on('body:not(.anticore) [data-sse]', element => {
  sse(element.dataset.sse)
})

// matching any received .sse[data-target] (the events)
on('.anticore > .sse[data-target]', element => {
  const { firstElementChild } = document.querySelector(element.dataset.target)

  firstElementChild.replaceWith(element)
})
