var save = require('../db/pgp/save');

function setGameState(req, res, next) {
  req.gameState = {};
  req.gameState.phone = req.body.From.toLowerCase();
  req.gameState.location = res.save.location;
  req.gameState.input = req.body.Body.toLowerCase();
  next()
}

function saveNew(req, res, next) {
  if (res.newUser) {
    console.log('new user');
    save.insertNewUser(req, res, next)
  }
  next();
}

function setNew(req, res, next) {
  if (res.newUser) {
    res.save = {
      phone: req.body.From,
      location: 'intro'
    }
  }
  next();
}

function checkInput() {

}

module.exports.setGameState = setGameState;
module.exports.saveNew = saveNew;
module.exports.setNew = setNew;
