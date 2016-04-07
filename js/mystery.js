'use strict'

var gameState = {
  phone: 0,
  location: '',
  text: '',
  choices: [],
  input: ''
}

function badInput() {
  var bad = true;
  req.gameState.choices.forEach(function(el) {
    if (el === input) {
      bad = false;
    }
  });
  return bad;
}

function start(req, res, next) {
  if (badInput) {
    req.gameState.text = `What was that? your choices are:
${req.gameState.choices.join(' | ')}`
    next();
  } else {
    directory(req, res, next)
  }
}

function directory(req, res, next) {
  switch (req.gameState.location.split('-')[0]) {
    case 'intro':
      intro(req, res, next);
      break;
    case 'house':
      house(req, res, next);
      break;
    default:

  }
}

function intro(req, res, next) {
  var location = req.gameState.location.split('-');
  if(location.length === 1) {
    req.gameState.location = 'intro-c1';
    req.gameState.text = `It is 9:30 pm on a Tuesday.  You are in for the night, watching tv.  You are thinking about going to bed, but you don’t really feel like getting off the couch.  A particularly irritating commercial is interrupted by the ringing of your phone.  You glance at the caller ID.  It’s the precinct.

    Do you pick it up?
    Text
    yes or no`;
    req.gameState.choices = ['yes', 'no'];
  } else if(location[1] === 'c1'){
    if(req.gameState.input === 'yes') {
      req.gameState.location = 'intro-end';
      req.gameState.text = `You groan, and answer it.  “What is it now?”  “Quit with the attitude, detective.” the sergeant snaps.  “There’s been a murder.”

      Text
      drive`;
      req.gameState.choices = ['drive'];
    } else {
      req.gameState.text = `The phone continues to ring, do you pick it up?

      Text
      yes or no`
      req.gameState.choices = ['yes', 'no'];
    }
  } else {
    req.gameState.location = 'house';
    req.gameState.text = `You arrive at the crime scene by 10:00, which was frankly a miracle given the traffic.  The uniform on scene briefs you on your way in.  “The victim was found in the dining room.” he says. “He’s been ID’d as Daniel Jenkins, lives at 34th and Lex.  He was here for a dinner party.  There were 9 other guests.  The hosts, Bert and Victoria Eichmann, are in the kitchen.  There’s another couple, the Gerholds, in the living room with a Ms. Cremin.  Mr. Cremin is in the rec room with John Gardner and his wife,  Dr. Serenity Schaden.  The victim’s wife, Diana Jenkins, is in the office.

    Where would you like to go first?”
    office, rec room, kitchen, or living room`;
    req.gameState.choices = ['office', 'rec room', 'kitchen', 'living room'];
  }
  next();
}

function house(req, res, next) {
  switch (req.gameState.input) {
    case 'office':

      break;
    case 'rec room':

      break;
    case 'kitchen'

      break;
    case 'living room':

      break;
    default:

  }
}

module.exports = start;
