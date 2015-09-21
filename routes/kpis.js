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

router.get('/:id', function(req,res) {
    Kpis.find({
            where: { id: req.params.id },
        })
        .then(function(kpi) {
            res.send(kpi);
        });
});

router.post('/:id', function(req,res) {
    Kpis.update({
        current: req.body.current
    },
    {
        where: {id: req.params.id}
    })
    .then(function(){
        Kpis.find(req.params.id)
        .then(function(kpi){
            res.send(kpi);
        });
    });
})

module.exports = router;