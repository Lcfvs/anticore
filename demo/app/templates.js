import * as dom from './dom.js'

const load = dom.load.bind(null, import.meta)

export const layout = {
  ...load('./html/layout.html'),
  description: null,
  main: null,
  title: null
}

export const error = {
  ...load('./html/error.html'),
  name: null,
  selector: null,
  fill (name) {
    return {
      ...this,
      name,
      selector: `form [name='${name}']`
    }
  }
}

export const home = {
  description: load('./html/home/description.html'),
  main: load('./html/home/main.html'),
  title: load('./html/home/title.html')
}

export const form = {
  description: load('./html/form/description.html'),
  main: {
    ...load('./html/form/main.html'),
    partials: {
      result: ''
    }
  },
  title: load('./html/form/title.html')
}

export const congrats = {
  description: load('./html/congrats/description.html'),
  main: load('./html/congrats/main.html'),
  title: load('./html/congrats/title.html')
}
