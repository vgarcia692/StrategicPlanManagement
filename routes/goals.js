var bodyParser 	= 	require('body-parser'),
	express 	=	require('express'),
	models 		= 	require('../models'),
	router 		= 	express.Router(),
	Goal		= 	models.Goal;

router.get('/', function(req,res) {
	Goal.findAll({ attributes: ['id', 'title', 'description']})
		.then(function(goals) {
			res.send(goals);
		});
});

router.get('/:id', function(req,res) {
	Goal.find({
		where: { id: req.params.id },
		include: [
			{ 
				model: models.Objective,
				include: [models.Activities] 
			},
            {
                model: models.KPIs
            }
		]
	})
	.then(function(goal) {
		res.json(goal);
	});
});


module.exports = router;