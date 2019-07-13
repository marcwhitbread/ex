var express = require('express')
var router = express.Router();
var path = require('path');
var models = require(path.join(__dirname, '../..', 'models'));

router.param('destination', function(req, res, next, id) {

	models.Destination
		.scope({ method: ['forAuthUser', req.user.id] })
		.find({
			where: {
				id: id
			}
		})
		.then(destination => {
			if(!destination)
				return res.status(401).json({ message: 'access denied' });

			req.destination = destination;
			next();
		})

});

router.get('/', function(req, res, next) {

  models.Destination
		.scope({ method: ['forAuthUser', req.user.id] })
		.findAll()
		.then(destinations => {
      res.json(destinations);
    });

});

router.post('/', function(req, res, next) {
  
  let obj = req.body;
  obj.UserId = req.user.id;
  console.log(obj);

  models.Destination.create(obj)
    .then(destination => {
      res.json(destination);
    })

});

router.delete('/:destination',
	function(req, res) {

		req.destination.destroy()
			.then(() => {
				res.json({ deleted: true });
			});

	}
)

module.exports = router