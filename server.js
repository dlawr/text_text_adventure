'use strict'
require('dotenv').config();
const secret       = process.env.SECRET;
const express      = require('express');
const logger       = require('morgan');
const path         = require('path');
const bodyParser   = require('body-parser');
const expressJWT   = require('express-jwt');
// const guestRoutes  = require( path.join(__dirname, '/routes/guests'));
// const userRoutes   = require( path.join(__dirname, '/routes/users'));

const app          = express();
const _port        = process.argv[2]|| process.env.port||3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));

app.use(logger('dev'));

app.get('/', (req, res) => {res.send('it\'s alive')})

// app.use('/api/guests', guestRoutes)
// app.use('/api/users',expressJWT({secret:secret}),userRoutes)

app.listen(_port , ()=>
  console.log(`server here! listening on`, _port )
);
