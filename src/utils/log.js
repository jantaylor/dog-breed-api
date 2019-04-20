'use strict'

const config = require('config')
const bunyan = require('bunyan')
const bunyanFormat = require('bunyan-format')

const log = bunyan.createLogger({
  name: config.get('log.name'),
  level: config.get('log.level'), // trace|debug|info|warn|error|fatal
  streams: [
    {
      stream: bunyanFormat({
        outputMode: config.get('log.format') // short|long|simple|json|bunyan
      })
    }
  ]
})

log.addSerializers({
  req: bunyan.stdSerializers.req,
  res: bunyan.stdSerializers.res,
  err: bunyan.stdSerializers.err
})

module.exports = log
