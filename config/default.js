'use strict'

const path = require('path')
const BASE_PATH = path.join(__dirname, '..', 'src')
const { deferConfig: defer } = require('config/defer')
const { name } = require('../package.json')

module.exports = {
  name,
  port: '3000',
  trustProxy: false,
  client: 'pg',
  connection: 'postgres://postAdmin:8P69RoDj10KJF8LS@localhost:5432/breed_api',
  migrations: {
    directory: path.join(BASE_PATH, 'db', 'migrations')
  },
  seeds: {
    directory: path.join(BASE_PATH, 'db', 'seeds')
  },
  log: {
    name: defer(config => config.name),
    level: 'debug', // trace|debug|info|warn|error|fatal
    format: 'bunyan' // short|long|simple|json|bunyan
  }
}
