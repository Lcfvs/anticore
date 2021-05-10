import { defaults, trigger } from 'https://unpkg.com/anticore@latest/index.js'
// import all your contracts here
import './contracts/index.js'
// import here your tree contracts at very last
import './view-switcher.js'
import './validation-error.js'

defaults() // register the default contracts, to handle your anchors/forms without target attribute
trigger() // applies the contracts on the current document elements
