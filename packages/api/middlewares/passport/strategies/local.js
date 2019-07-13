var path = require('path');
var models = require(path.join(__dirname, '../../..', 'models'));
// var passport = require('passport')
LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, function(email, password, done) {

		models.User
			.findOne({ 
				where: {
					email: email
				}
			})
			.then((user) => {

				if(!user)
					return done(null, false, { message: 'authentication failed' });

				user
					.checkPassword(password)
					.then(is_match => {

						console.log(is_match);

						if(is_match)
							return done(null, user);
						else
							return done(null, false, { message: 'authentication failed' });

					})

			})

	}))

}