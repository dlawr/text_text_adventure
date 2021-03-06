var save = require('../db/pgp/save');

function setGameState(req, res, next) {
  req.gameState = {};
  req.gameState.phone = req.body.From;
  req.gameState.location = res.save.location;
  req.gameState.input = req.body.Body.toLowerCase();
  req.gameState.met = res.save.met;
  req.gameState.choices = res.save.choices;
  next();
}

function saveNew(req, res, next) {
  if (res.newUser) {
    req.body.Body = '';
    save.insertNewUser(req, res, next);
  }
  next();
}

function setNew(req, res, next) {
  if (res.newUser) {
    res.save = {
      phone: req.body.From,
      location: 'intro',
      choices: ['yes', 'no']
    }
  }
  next();
}

function addChoices(req, res, next) {
  if (req.gameState.location != 'complete') {
    if (req.gameState.met && req.gameState.location.split('-')[0] != 'accuse') {
      req.gameState.choices.push('accuse');
    }
    req.gameState.text = `${req.gameState.text}

${req.gameState.choices.join(' | ')}`;

  }
  next();
}

module.exports.setGameState = setGameState;
module.exports.saveNew = saveNew;
module.exports.setNew = setNew;
module.exports.addChoices = addChoices;
