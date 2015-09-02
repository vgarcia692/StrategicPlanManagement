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


module.exports = router;