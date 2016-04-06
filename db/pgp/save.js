'use strict';
const pgp = require('pg-promise')({});

if (process.env.ENVIRONMENT === 'production') {
  var cn = process.env.DATABASE_URL;
} else {
  var cn = {
    host: process.env.HOST, // server name or IP address;
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  }
}

const db = pgp(cn);

function getSaveData(req, res, next) {
  db.one(`select * from states where phone like $/From/`,req.body)
  .then(function(data) {
    res.save = data;
    next();
  })
  .catch(function(err) {
    console.error('error with pgp/save getSaveData',err);
    res.save = 'new user';
    next();
  })
}

module.exports.getSaveData = getSaveData;
