import { anticore } from '../../../index'

const localizer = {
  locale: {
    pattern: /^[a-z]{2}-[A-Z]{2}$/,
    parse: function (element) {
      return (element.lang || '').match(this.pattern) ||
        (element.parentNode && this.parse(element.parentNode)) ||
        navigator.language.match(this.pattern) ||
        undefined
    }
  },
  patterns: {
    toLocaleString: /^\d+-\d+-\d+T\d+:\d+:\d+/,
    toLocaleDateString: /^\d+-\d+-\d$/,
    toLocaleTimeString: /^\d+:\d+:\d+/
  },
  format: function (element) {
    const time = element.getAttribute('datetime')
    const date = new Date(Date.parse(time))
    const locale = this.locale.parse(element)
    const methods = Object.keys(this.patterns)
    const offset = new Date().getTimezoneOffset()

    date.setUTCHours(date.getUTCHours() + offset / 60)

    do {
      let method = methods.shift()

      if (time.match(this.patterns[method])) {
        element.innerHTML = date[method](locale)

        return
      }
    } while (methods.length)
  }
}

anticore.on('time:not([datetime=""])', function (element, next) {
  localizer.format(element)
  next()
})
