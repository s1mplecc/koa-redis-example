/**
 * MongoDB configuration using generators (with the help of co-mongo package).
 * You can require this config file in your controllers and start using named collections directly.
 * See /controllers directory for sample usage.
 */
const mongodb = require('mongodb'),
  connect = mongodb.connect
// config = require('./config')

// extending and exposing top co-mongo namespace like this is not optimal but it saves the user from one extra require();
module.exports = mongodb

/**
 * Opens a new connection to the mongo database, closing the existing one if exists.
 */
mongodb.connect = async function () {
  if (mongodb.db) {
    await mongodb.db.close()
  }

  // export mongo db instance
  const db = mongodb.db = await connect('mongodb://bigdata:bigdata_123@172.20.10.126/bigdata')

  // export default collections
  mongodb.report = db.collection('bi_report')
  mongodb.category = db.collection('bi_category')
}

/**
 * Retrieves the next sequence number for the given counter (indicated by @counterName).
 * Useful for generating sequential integer IDs for certain collections (i.e. user collection).
 */
// mongodb.getNextSequence = async function (counterName) {
//   var results = await mongodb.counters.findOneAndUpdate(
//     { _id: counterName },
//     { $inc: { seq: 1 } },
//     { returnOriginal: false }
//   )
//
//   return results.value.seq
// }