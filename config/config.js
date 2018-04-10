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
      port: 3000
    },
    mongo: {
      url: 'mongodb://bigdata:bigdata_123@localhost/bigdata'
    }
  },

  test: {
    app: {
      port: 3000
    },
    mongo: {
      url: 'mongodb://bigdata:bigdata_123@172.20.10.126/bigdata'
    }
  },

  production: {
    app: {
      port: process.env.PORT || 3000,
      cacheTime: 7 * 24 * 60 * 60 * 1000
    },
    mongo: {
      url: process.env.MONGODB_URI || process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/koan'
    }
  }
}

// override the base configuration with the platform specific values
module.exports = _.merge(baseConfig, platformConfig[baseConfig.app.env || (baseConfig.app.env = 'development')])
