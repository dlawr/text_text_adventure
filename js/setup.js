var save = require('../db/pgp/save');

function setGameState(req, res, next) {
  req.gameState = {};
  req.gameState.phone = req.body.From;
  req.gameState.location = res.save.location;
  req.gameState.text = res.save.flavor_text;
  req.gameState.choices = res.save.choices;
  req.gameState.input = req.body.Body;
  next()
}

function checkNew(req, res, next) {
  if (res.newUser) {
    console.log('new user');
    save.insertNewUser(req, res, next)
  }
  next();
}

function checkInput() {

}

module.exports.setGameState = setGameState;
module.exports.checkNew = checkNew;
