var express = require('express')
var router = express.Router()
var passport = require('passport');
var generate_token = require('./../../middlewares/generate_token');
var get_auth_user = require('./../../middlewares/get_auth_user');

router.post('/login', function(req, res, next) {

	passport.authenticate('local', function(err, user, info) {
		if(err) { next(err) }
		if(!user) { return res.status(401).json(info) }
		req.user = user;
		next();
	}, {
		session: false
	})(req, res, next);
	
}, generate_token, get_auth_user(), function(req, res, next) {

	res.json({
    user: Object.assign(req.user.get()),
    token: req.token
  });

});

module.exports = router