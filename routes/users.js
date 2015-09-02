var bodyParser 	= 	require('body-parser'),
	express 	=	require('express'),
	models 		= 	require('../models'),
	router 		= 	express.Router(),
	Users		= 	models.User;

router.get('/', function(req,res) {
	Users.findAll({ attributes: ['id', 'f_name', 'l_name', 'email']})
		.then(function(users) {
			res.send(users);
		});
});

module.exports = router;