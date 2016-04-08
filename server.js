'use strict'
require('dotenv').config();
const secret       = process.env.SECRET;
const express      = require('express');
const logger       = require('morgan');
const path         = require('path');
const bodyParser   = require('body-parser');
const expressJWT   = require('express-jwt');
const client       = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
// const guestRoutes  = require( path.join(__dirname, '/routes/guests'));
// const userRoutes   = require( path.join(__dirname, '/routes/users'));

const app          = express();
const _port        = process.argv[2]|| process.env.PORT||3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));

app.use(logger('dev'));

app.get('/', (req, res) => {res.send('it\'s alive')})

app.get('/send/:number', (req, res) => {
  client.messages.create({
    to: `+${req.params.number}`,
    from: `+${process.env.PHONE}`,
    body: `thing`
    // body: `123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345`
  }, function(err, message) {
    console.log(message.sid);
  });
  res.send('hopefully sent')
})

app.get('/messages', (req, res) => {
  client.messages.list({
  }, function(err, data) {
    console.log(data.messages);
	  data.messages.forEach(function(message) {
	    console.log(message.from);
	  });
  });
})
const text = require('./db/pgp/text.js');
const save = require('./db/pgp/save.js');
const setup = require('./js/setup.js');
const mystery = require('./js/mystery.js');
app.post('/text', text.newText, (req, res) => {res.json(res.text_id)})
app.get('/text', text.allTexts, (req, res) => {res.json(res.texts)})

app.post('/game',
save.getSaveData,
setup.saveNew,
setup.setNew,
setup.setGameState,
mystery,
save.saveCurrentData,
(req, res) => {
  console.log('final callback',req.gameState);
  client.messages.create({
    to: req.gameState.phone,
    from: `+${process.env.PHONE}`,
    body: req.gameState.text
  }, function(err, message) {
    console.log(message.sid, req.gameState);
  });
  res.send(req.gameState.text);
})

// app.use('/api/guests', guestRoutes)
// app.use('/api/users',expressJWT({secret:secret}),userRoutes)

app.listen(_port , console.log(`server listening on ${_port}`));
