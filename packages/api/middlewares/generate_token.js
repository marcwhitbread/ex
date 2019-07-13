const jwt = require('jsonwebtoken');
var path = require('path');
var models = require(path.join(__dirname, '..', 'models'));

module.exports = function(req, res, next) {

	req.token = jwt.sign({
    id: req.user.id,
  }, require('./../config/jwt')['local']['secret'], {
    expiresIn: '120m'
  });

	next();

}