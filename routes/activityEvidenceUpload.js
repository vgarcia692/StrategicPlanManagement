var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
var multer = require('multer');
var router = express.Router();


router.post('/', [multer({
    dest: __dirname + '/../activityEvidenceUploads',
    rename: function(fieldname, filename) {
        var d = new Date();
        return d + '_' + filename;
    },
    onFileUploadStart: function(file){
        console.log('Upload of ' + file.name + ' is starting ...');
    },
    onFileUploadComplete: function(file) {
        console.log('File upload Complete.');
    }
})], function(req,res,next) {
    if (!req.files.size) { 
        res.end('no file');
    } 
    else {
        res.send(200);
    }
})


module.exports = router;

