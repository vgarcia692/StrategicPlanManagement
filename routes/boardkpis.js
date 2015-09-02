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


module.exports = router;