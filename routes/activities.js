var bodyParser  =   require('body-parser'),
    express     =   require('express'),
    models      =   require('../models'),
    router      =   express.Router(),
    Activities         =   models.Activities;

router.get('/', function(req,res) {
    Activities.findAll()
        .then(function(acts) {
            res.send(acts);
        });
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


module.exports = router;