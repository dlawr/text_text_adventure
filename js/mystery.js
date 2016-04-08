'use strict'

var gameState = {
  phone: 0,
  location: '',
  text: '',
  choices: [],
  input: '',
  met: []
}

function badInput(req) {
  var bad = true;
  req.gameState.choices.forEach(function(el) {
    if (el === req.gameState.input) {
      bad = false;
    }
  });
  if (req.gameState.location === 'intro') {
    bad = false;
  }
  console.log(bad);
  return bad;
}

function see(person) {
  var seen = false;
  req.gameState.met.forEach(function(el) {
    if (el = person) {
      seen = true
    }
  });
  if (!seen) {
    req.gameState.met.push(person);
  }
}

function start(req, res, next) {
  if (badInput(req)) {
    console.log(req.gameState);
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
    case 'office':

      break;
    case 'rec room':

      break;
    case 'kitchen':

      break;
    case 'living room':

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
      office(req, res, next);
      break;
    case 'rec room':

      break;
    case 'kitchen':

      break;
    case 'living room':

      break;
    default:

  }
}

function office(req, res, next) {
  req.gameState.choices = ['office', 'rec room', 'kitchen', 'living room'];
  req.gameState.text = `The office is fairly small, with a wooden desk and bookshelves, and a pair of leather armchairs on either side of a small table.  The table holds the end of a chess game.  There are few pieces left, and the white king is in checkmate near one corner of the board.  A tall blonde woman is pacing nervously.  You approach.  “Mrs. Jenkins, I’m so sorry for your loss.  Please, have a seat.  What can you tell me about what happened tonight?”  “After dinner, we all split up.  I came in here with Serenity for a game of chess.  We had a lot to catch up on, we were roommates in college, but she and her husband only just moved back into town.  Anyway, we finished our game around 9:00 and she left to find her husband.  That’s all I know.”

  office, rec room, kitchen, or living room`
  next();
}

module.exports = start;
