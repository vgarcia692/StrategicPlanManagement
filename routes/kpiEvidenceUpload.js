var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
var multer = require('multer');
var router = express.Router();

// router.post('/', [ multer(), function(req, res){
//     res.send(200);
// }]);

router.post('/', function(req,res,next) {
    if (!req.files.size) { 
        res.end('no file');
    } 
    else {
        res.send(200);
    }
})


module.exports = router;

