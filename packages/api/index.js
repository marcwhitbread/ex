var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var models = require(path.join(__dirname, 'models'));

var express = require('express')
var passport = require('passport');
var path = require('path')
var app = express();

app.use(cors());

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(cookieParser());
// app.use('/static', express.static(path.join(__dirname, 'app/dist')))

require('./middlewares/passport/strategies/local')(passport);
app.use(passport.initialize());
app.use('/', require('./routes'));

models.sequelize.sync({
	// force: true
}).then(function () {
	app.listen(process.env.PORT, function() {
		console.log(`starting ${process.env.NODE_ENV} environment`)
		console.log(`jobboard started on http://localhost:${process.env.PORT}`)
	});
});