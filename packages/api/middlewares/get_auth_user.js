const jwt = require('jsonwebtoken');
var path = require('path');
var models = require(path.join(__dirname, '..', 'models'));

module.exports = function() {
	return function(req, res, next) {

		if(req.user && req.user.id) {
			models.User
				.scope('authUser')
				.findOne({
					where: {
						id: req.user.id
					}
				})
				.then(user => {
					if(!user)
						return res.status(401).json({ message: 'access denied' });

					delete user.password;

					req.user = user;
					next();
				})
		}

	}
}