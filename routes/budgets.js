var bodyParser  =   require('body-parser'),
    express     =   require('express'),
    models      =   require('../models'),
    router      =   express.Router(),
    Budget         =   models.Budget;

router.post('/', function(req,res) {
    var newLineItem = {
        line_item: req.body.line_item,
        source: req.body.source,
        amount: req.body.amount,
        ObjectiveId: req.body.ObjectiveId
    };
    
    Budget.create(newLineItem)
        .then(function(budget) {
            // why newLineItem??? should this be budget
            res.send(budget);
        });
});

router.delete('/', function(req,res) {
    Budget.find(req.query.id)
        .then(function(lineItem) {
            lineItem.destroy();
            res.send(200);
        });
});

router.put('/', function(req,res) {
    console.log(req.body.amount);
    console.log(req.body.id);
    Budget.update(
    {
        amount: req.body.amount
    },
    {
        where: {id: req.query.id}
    })
    .then(function(){
        Budget.find(req.query.id)
        .then(function(budget) {
            console.log(budget.amount);
            res.send(budget);
        });
    });
});

module.exports = router;