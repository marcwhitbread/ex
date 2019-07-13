var express = require('express')
var router = express.Router();
var jwt = require('express-jwt');
var jwt_secret = require('./../config/jwt')['local']['secret'];
var get_auth_user = require('./../middlewares/get_auth_user');

router.use('/auth', require('./auth'));

//ALL AUTH BELOW HERE
router.use('/*', jwt({ secret: jwt_secret }), get_auth_user())

router.use('/plans', require('./plans'));

module.exports = router;