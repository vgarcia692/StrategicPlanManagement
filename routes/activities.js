var bodyParser  =   require('body-parser'),
    express     =   require('express'),
    models      =   require('../models'),
    router      =   express.Router(),
    Activities         =   models.Activities;

router.get('/', function(req,res) {
    if (req.query.count) {
        Activities.count({attributes: ['status'], group:'status'})
        .then(function(count) {
            res.send(count);
        });
    } else {
        Activities.findAll()
        .then(function(acts) {
            res.send(acts);
        });
    }
});

router.get('/:id', function(req,res) {
    Activities.find({
        where: {id: req.params.id}
    })
    .then(function(act){
        res.send(act);
    });
})

router.put('/:id', function(req,res) {
    Activities.update({
        status: req.body.status
    },
    {
        where: {id: req.params.id}
    })
    .then(function(){
        res.send(200);
    });
});

router.post('/:id', function(req,res) {
    Activities.update({
        statusPercent: req.body.statusPercent
    },
    {
        where: {id: req.params.id}
    })
    .then(function(){
        Activities.find(req.params.id)
        .then(function(act){
            res.send(act);
        });
    });
})


module.exports = router;