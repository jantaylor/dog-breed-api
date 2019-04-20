'use strict'

// Update with your config settings.
const path = require('path')

const BASE_PATH = path.join(__dirname, 'src', 'db');

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://postAdmin:8P69RoDj10KJF8LS@localhost:5432/dog-breeds-api',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  docker: {
    client: 'pg',
    connection: 'postgres://postAdmin:8P69RoDj10KJF8LS@gateway.docker.internal:5432/dog-breeds-api',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    },
  }
}
