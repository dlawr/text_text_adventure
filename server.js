'use strict'
require('dotenv').config();
const secret        = process.env.SECRET;
const express       = require('express');
const logger        = require('morgan');
const path          = require('path');
const bodyParser    = require('body-parser');
const expressJWT    = require('express-jwt');
const client        = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const text          = require('./db/pgp/text.js');
const save          = require('./db/pgp/save.js');
const setup         = require('./js/setup.js');
const mystery       = require('./js/mystery.js');

const app           = express();
const _port         = process.argv[2]|| process.env.PORT||3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));

app.use(logger('dev'));

app.post('/game',
save.getSaveData,
setup.setNew,
setup.setGameState,
mystery,
setup.addChoices,
setup.saveNew,
save.saveCurrentData,
(req, res) => {
  if (req.gameState.location === 'complete') {
    save.deleteState(req);
  }
  client.messages.create({
    to: req.gameState.phone,
    from: `+${process.env.PHONE}`,
    body: req.gameState.text
  }, function(err, message) {
    if (err) {
      console.log(err, message);
    }
  });
  res.send(req.gameState.text);
})

app.listen(_port , console.log(`server listening on ${_port}`));
