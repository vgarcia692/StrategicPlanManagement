var bodyParser  =   require('body-parser'),
    express     =   require('express'),
    models      =   require('../models'),
    router      =   express.Router(),
    Kpis         =   models.KPIs;

router.get('/', function(req,res) {
    Kpis.findAll()
        .then(function(kpis) {
            res.send(kpis);
        });
});


module.exports = router;