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
    if (el.toLowerCase() === req.gameState.input) {
      bad = false;
    }
  });
  if (req.gameState.location === 'intro') {
    bad = false;
  }
  console.log(bad);
  return bad;
}

function see(req, person) {
  if (!req.gameState.met) {
    req.gameState.met = [];
    req.gameState.met.push(person);
  } else {
    var seen = false;
    req.gameState.met.forEach(function(el) {
      if (el === person) {
        seen = true
      }
    });
    if (!seen) {
      req.gameState.met.push(person);
    }
  }
}

function start(req, res, next) {
  if (badInput(req)) {
    console.log(req.gameState);
    req.gameState.text = `What was that? your choices are:`
    next();
  } else {
    if (req.gameState.input === 'accuse') {
      req.gameState.location = 'accuse';
    }
    directory(req, res, next);
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
      office(req, res, next);
      break;
    case 'rec room':
      recRoom(req, res, next);
      break;
    case 'kitchen':
    kitchen(req, res, next);
      break;
    case 'living room':
    livingRoom(req, res, next);
      break;
    case 'accuse':
      accuse(req, res, next);
      break;
    default:

  }
}

function accuse(req, res, next) {
  if (req.gameState.location === 'accuse') {
    req.gameState.location = 'accuse-c1';
    req.gameState.text = 'Who did it?';
    req.gameState.choices = req.gameState.met;
    next();
  } else {
    req.gameState.location = 'complete';
    req.gameState.text = `Congradulations ${req.gameState.input} was arrested for the murder of Daniel Jenkins`;
    next();
  }
}

function intro(req, res, next) {
  var location = req.gameState.location.split('-');
  if(location.length === 1) {
    req.gameState.location = 'intro-c1';
    req.gameState.text = `It is 9:30 pm on a Tuesday.  You are in for the night, watching tv.  You are thinking about going to bed, but you don’t really feel like getting off the couch.  A particularly irritating commercial is interrupted by the ringing of your phone.  You glance at the caller ID.  It’s the precinct.

    Do you pick it up?`;
    req.gameState.choices = ['yes', 'no'];
  } else if(location[1] === 'c1'){
    if(req.gameState.input === 'yes') {
      req.gameState.location = 'intro-end';
      req.gameState.text = `You groan, and answer it.  “What is it now?”  “Quit with the attitude, detective.” the sergeant snaps.  “There’s been a murder.”`;
      req.gameState.choices = ['drive'];
    } else {
      req.gameState.text = `The phone continues to ring, do you pick it up?`;
      req.gameState.choices = ['yes', 'no'];
    }
  } else {
    req.gameState.location = 'house';
    req.gameState.text = `You arrive at the crime scene by 10:00, which was frankly a miracle given the traffic.  The uniform on scene briefs you on your way in.  “The victim was found in the dining room.” he says. “He’s been ID’d as Daniel Jenkins, lives at 34th and Lex.  He was here for a dinner party.  There were 9 other guests.  The hosts, Bert and Victoria Eichmann, are in the kitchen.  There’s another couple, the Gerholds, in the living room with a Ms. Cremin.  Mr. Cremin is in the rec room with John Gardner and his wife,  Dr. Serenity Schaden.  The victim’s wife, Diana Jenkins, is in the office.

    Where would you like to go first?`;
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
      recRoom(req, res, next);
      break;
    case 'kitchen':
      kitchen(req, res, next);
      break;
    case 'living room':
      livingRoom(req, res, next);
      break;
    default:

  }
}

function office(req, res, next) {
  req.gameState.choices = ['office', 'rec room', 'kitchen', 'living room'];
  req.gameState.text = `The office is fairly small, with a wooden desk and bookshelves, and a pair of leather armchairs on either side of a small table.  The table holds the end of a chess game.  There are few pieces left, and the white king is in checkmate near one corner of the board.  A tall blonde woman is pacing nervously.  You approach.  “Mrs. Jenkins, I’m so sorry for your loss.  Please, have a seat.  What can you tell me about what happened tonight?”  “After dinner, we all split up.  I came in here with Serenity for a game of chess.  We had a lot to catch up on, we were roommates in college, but she and her husband only just moved back into town.  Anyway, we finished our game around 9:00 and she left to find her husband.  That’s all I know.”`;
  see(req, 'Diana Jenkins');
  next();
}

function recRoom(req, res, next) {
  var location = req.gameState.location.split('-');
  if (location.length === 1) {
    req.gameState.location = `rec room-c1`
    req.gameState.text = `As you enter the rec room, you see a pool table and a foosball table off to the right, with what appears to be a pool game abandoned mid-stream.  On the left, three people are sitting on an overstuffed couch, in front of a television screen.  The TV is currently off.  Two of the people, a petite brunette and a man of middling height, are sitting close together at one end of the couch, while a balding man sits a few feet away, facing them.  You say, “I’d like to speak to …`
    req.gameState.choices = ['Dr. Serenity Schaden', 'John Gardner', 'Jacques Cremin', 'exit'];
  } else {
    switch (req.gameState.input) {
      case 'exit':
        req.gameState.location = 'house';
        req.gameState.text = `Where would you like to go?`;
        req.gameState.choices = ['office', 'rec room', 'kitchen', 'living room'];
        break;
      case 'dr. serenity schaden':
        req.gameState.choices = ['John Gardner', 'Jacques Cremin', 'exit']
        req.gameState.text = `“I’ve been in the office with Diana since dinner.  It’s been a long time since we got to catch up, because my residency was out of town.  After she kicked my butt at chess, I came looking for John.  He was on his way to find me in the office, but I caught up to him before he got there, and we came in here.”`;
        see(req, 'Dr. Serenity Schaden');
        break;
      case 'john gardner':
        req.gameState.choices = ['Dr. Serenity Schaden', 'Jacques Cremin', 'exit']
        req.gameState.text = `“After dinner, I went into the living room.  Victoria Eichmann and I were playing a game of scrabble.  We have a long-running rivalry on the subject.  After she won, I left to look for my wife in the office, but I found her in the hall near the rec room, and then we ran into Jacques so we came in here.  We were thinking of playing some pool.”`;
        see(req, 'John Gardner');
        break;
      case 'jacques cremin':
        req.gameState.choices = ['Dr. Serenity Schaden', 'John Gardner', 'exit']
        req.gameState.text = `“I was in kitchen with Bert Eichmann after dinner.  He’s the cook in this house, and I was helping him with cleanup.  He likes the company, and I am a bit of a cook myself, so I usually help him with the dishes.  When Victoria came in I decided to come find a game of pool.”`;
        see(req, 'Jacques Cremin');
        break;
      default:
    }
  }
  next();
}

function kitchen(req, res, next) {
  var location = req.gameState.location.split('-');
  if (location.length === 1) {
    req.gameState.location = `kitchen-c1`;
    req.gameState.text = `The kitchen is fairly large, with maple cabinets and beige countertops.  There are two figures sitting on stools at the island in the middle of the kitchen.  The man is slumped over the counter, while the woman is sitting straighter, staring into the middle distance.  A few remnants of the dinner remain, but mostly the evidence of the party consists of a pile of dishes drying by the sink, and a tray of flan that has not yet been served.`;
    req.gameState.choices = ['Victoria Eichmann', 'Bert Eichmann', 'exit'];
  } else {
    switch (req.gameState.input) {
      case 'exit':
        req.gameState.location = 'house';
        req.gameState.text = `Where would you like to go?`;
        req.gameState.choices = ['office', 'rec room', 'kitchen', 'living room'];
        break;
      case 'victoria eichmann':
        req.gameState.choices = ['Bert Eichmann', 'exit'];
        req.gameState.text = `“I’ve been in the living room since dinner.  I was beating the pants off Jeanette in Scrabble.  I won with “excellent” with the x on the triple-letter.  Anyway, after I won I came in here to see how Bert was doing.  I always feel a bit guilty about leaving him to clean up while I’m having fun.  When I came in, Jacques was here helping, but I told him he could go find something more fun to do.”`;
        see(req, 'Victoria Eichmann');
        break;
      case 'bert eichmann':
        req.gameState.choices = ['Victoria Eichmann', 'exit'];
        req.gameState.text = `“I’ve been here since dinner, cleaning up and putting the finishing touches on dessert.  Jacques came in here with me to begin with, and he was a great help getting everything cleaned up.  We had a nice chat about the playoffs and the best methods of making flan.  He left when Victoria came in, I think he thought she wanted a moment alone with me.”`;
        see(req, 'Bert Eichmann');
        break;
      default:
    }
  }
  next();
}

function livingRoom(req, res, next) {
  var location = req.gameState.location.split('-');
  if (location.length === 1) {
    req.gameState.location = `living room-c1`;
    req.gameState.text = `An overstuffed sectional dominates the living room, facing a large stone fireplace.  There is no fire at the moment, but a fire has been laid in the hearth and is ready to light.  A low coffee table contains the pieces of a game of Scrabble, and the couch holds three people crowded around the Scrabble board.`;
    req.gameState.choices = ['Jeannette Cremin', 'Sandra Gerhold', 'David Gerhold', 'exit'];
  } else {
    switch (req.gameState.input) {
      case 'exit':
        req.gameState.location = 'house';
        req.gameState.text = `Where would you like to go?`;
        req.gameState.choices = ['office', 'rec room', 'kitchen', 'living room'];
        break;
      case 'jeannette cremin':
        req.gameState.choices = ['Sandra Gerhold', 'David Gerhold', 'exit'];
        req.gameState.text = `“Vicki and I came in here after dinner – Victoria Eichmann, the hostess – anyway, we came in here to play Scrabble.  After she kicked my butt, she went off to find Bert and I stayed to clean up the game, but then Sandra and David came in and wanted to play, so we started a new game.”`;
        see(req, 'Jeannette Cremin');
        break;
      case 'sandra gerhold':
        req.gameState.choices = ['Jeannette Cremin', 'Sandra Gerhold', 'David Gerhold', 'exit'];
        req.gameState.text = `“After dinner, David and I went off to play pool in the rec room.  It was basically a draw, we both suck at pool, so eventually we called it quits and came in here to play Scrabble.  Unfortunately, Jeanette is much better than we are at it.”`;
        see(req, 'Sandra Gerhold');
        break;
      case 'david gerhold':
        req.gameState.choices = ['Jeannette Cremin', 'Sandra Gerhold', 'exit'];
        req.gameState.text = `“After dinner, my wife and I went to the rec room for a friendly game of pool.  After I won, (she’s a bit of a sore loser), we came in here to play Scrabble.  Luckily Jeanette was here to save us from a one-on-one game, there are only so many of those we can play in a night.”`
        see(req, 'David Gerhold');
        break;
      default:
    }
  }
  next();
}

module.exports = start;
