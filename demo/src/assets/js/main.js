import { defaults, trigger } from 'anticore'
import './contracts/index.js'

defaults() // register the default contracts, to handle your anchors/forms without target attribute
trigger() // applies the contracts on the current document elements
