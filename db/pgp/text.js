'use strict';
const pgp = require('pg-promise')({});

const cn = {
    host: process.env.HOST, // server name or IP address;
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
}

const db = pgp(cn);

function newText(req, res, next) {
  db.one(`insert into texts
    (body)
  values
  ($/body/)
  returning event_id`,req)
    .then(function(data) {
      res.text_id = data;
      next();
    })
    .catch(function(err) {
      console.error('error with db/text newText',err);
    })
}

function allTexts(req, res, next) {
  db.any(`select * from texts`)
    .then(function(data) {
      res.texts = data;
      next();
    })
    .catch(function(err) {
      console.error('error with db/text allTexts',err);
    })
}

module.exports.newText = newText;
module.exports.allTexts = allTexts;
