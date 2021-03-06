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
    res.newUser = true;
    next();
  })
}

function insertNewUser(req, res, next) {
  db.none(`insert into states (phone, location) values ($/From/, 'intro')`, req.body)
  .then(next)
  .catch(function(err) {
    console.error('error with pgp/save insertNewUser', err)
  })
}

function saveCurrentData(req, res, next) {
  db.none(`update states set
    (location, flavor_text, choices, met) =
    ($/location/, $/text/, $/choices/, $/met/)
    where phone like $/phone/`,
  req.gameState)
  .then(next)
  .catch(function(err) {
    console.error('error with pgp/save saveCurrentData', err);
  })
}

function deleteState(req) {
  db.none(`delete from states where phone like $/phone/`, req.gameState)
  .catch(function(err) {
    console.error('error with pgp/save deleteState', err);
  })
}

module.exports.getSaveData = getSaveData;
module.exports.insertNewUser = insertNewUser;
module.exports.saveCurrentData = saveCurrentData;
module.exports.deleteState = deleteState;
