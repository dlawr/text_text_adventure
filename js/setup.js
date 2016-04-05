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

function checkInput() {

}

module.exports.setGameState = setGameState;
