/**
 * Environment variables and application configuration.
 */

const path = require('path')
const _ = require('lodash')

const baseConfig = {
  app: {
    root: path.normalize(`${__dirname}/../..`),
    env: process.env.NODE_ENV,
    secret: process.env.SECRET || 'secret key' /* used in signing the jwt tokens */,
    pass: process.env.PASS || 'pass' /* generic password for seed user logins */
  }
}

// environment specific config overrides
const platformConfig = {
  development: {
    app: {
      port: 4000
    },
    mongo: {
      url: 'mongodb://bigdata:bigdata_123@172.20.10.126/bigdata'
    },
    redis: {
      url: '172.20.10.90',
      port: 6379
    }
  },

  production: {
    app: {
      port: process.env.PORT || 4000,
      cacheTime: 7 * 24 * 60 * 60 * 1000
    },
    mongo: {
      url: process.env.MONGODB_URI || process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://bigdata:bigdata_123@172.20.10.126/bigdata'
    },
    redis: {
      url: '192.168.10.31',
      port: 6379
    }
  },

  test: {
    app: {
      port: 4000
    },
    mongo: {
      url: 'mongodb://bigdata:bigdata_123@172.20.10.126/bigdata'
    },
    redis: {
      url: '172.20.10.90',
      port: 6379
    }
  }
}

// override the base configuration with the platform specific values
module.exports = _.merge(baseConfig, platformConfig[baseConfig.app.env || (baseConfig.app.env = 'development')])
