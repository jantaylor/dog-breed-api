'use strict'

const { deferConfig: defer } = require('config/defer')
const { name } = require('../package.json')

module.exports = {
  name,
  port: '3000',
  // configure database in knexfile.js
  log: {
    name: defer(config => config.name),
    level: 'info', // trace|debug|info|warn|error|fatal
    format: 'simle' // short|long|simple|json|bunyan
  }
}
