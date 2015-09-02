var bodyParser 	= 	require('body-parser'),
	express 	=	require('express'),
	models 		= 	require('../models'),
	router 		= 	express.Router(),
	Obj			= 	models.Objective;

router.get('/', function(req,res) {
	Obj.findAll()
		.then(function(objs) {
			res.send(objs);
		});
});

router.post('/', function(req, res) {
	var userId = req.body.assigneeId;
	var newObj = {
		objective: req.body.objective,
		due_date: req.body.due_date,
		GoalId: req.body.goalId	
	};

	Obj.create(newObj)
		.then(function(obj) {
			obj.addUsers(userId)
				.then(function() {
					Obj.find(obj.id, { include: [{ model: models.User }]})
						.then(function(resultObj) {
							res.send(resultObj);
						});
				});
		});
});

router.get('/:id', function(req,res) {
	Obj.find({
			where: { id: req.params.id },
			include: [{ model: models.Budget }, { model: models.ProgressReport}]	
		})
		.then(function(objs) {
			res.send(objs);
		});
});

router.put('/:id', function(req,res) {
    Obj.update({
        narrative: req.body.narrative
    },
    {
        where: {id: req.params.id}
    })
    .then(function(){
        Obj.find(req.params.id)
        .then(function(nar){
            res.send(nar);
        });
    });
});



module.exports = router;