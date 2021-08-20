import { on } from 'anticore'
import { one } from '../../utils/select.js'

// matching any received .error[data-target]
on('.anticore > .error[data-target]', element => {
  // retrieving the field in the document
  const { parentNode } = one(element.dataset.target)

  parentNode.append(element)
})
