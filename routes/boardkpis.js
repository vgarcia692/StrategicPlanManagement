var bodyParser  =   require('body-parser'),
    express     =   require('express'),
    models      =   require('../models'),
    router      =   express.Router(),
    BoardKPIs         =   models.BoardKPIs;

router.get('/', function(req,res) {
    BoardKPIs.findAll()
        .then(function(BKPIs) {
            res.send(BKPIs);
        });
});

router.get('/:id', function(req,res) {
    BoardKPIs.find({
        where: { id: req.params.id },
    })
    .then(function(bkpi) {
        res.json(bkpi);
    });
});

router.put('/:id', function(req,res) {
    BoardKPIs.update({
        f15: req.body.f15,
        sp16: req.body.sp16,
        su16: req.body.su16,
        f16: req.body.f16,
        sp17: req.body.sp17,
        su17: req.body.su17,
        f17: req.body.f17,
        sp18: req.body.sp18,
        su18: req.body.su18,
        f18: req.body.f18
    },
    {
        where: {id: req.params.id}
    })
    .then(function(){
        BoardKPIs.find(req.params.id)
        .then(function(bkpi){
            res.send(bkpi);
        });
    });
})


module.exports = router;