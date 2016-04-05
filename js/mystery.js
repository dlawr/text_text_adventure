'use strict'

var gameState = {
  phone: 0,
  location: '',
  text: ''
}

function start(req, res, next) {
  switch (req.gameState.location.split('-')[0]) {
    case intro:
      intro();
      break;
    default:

  }
}

function intro(req, res, next) {
  if(req.gameState.location.split('-').length === 1) {
    req.gameState.location = 'intro';
    req.gameState.text = `It is 9:30 pm on a Tuesday.  You are in for the night, watching tv.  You are thinking about going to bed, but you don’t really feel like getting off the couch.  A particularly irritating commercial is interrupted by the ringing of your phone.  You glance at the caller ID.  It’s the precinct.`

  }
  next();
}
