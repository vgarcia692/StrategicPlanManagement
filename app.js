
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler'),
  morgan = require('morgan'),
  passport = require('passport'),
  flash = require('connect-flash'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');
  multer = require('multer'),
  models = require(__dirname + '/models');

require('./config/passport')(passport);

// Require Routes
var goals = require('./routes/goals');
var objectives = require('./routes/objectives');
var users = require('./routes/users');
var budgets = require('./routes/budgets');
var progReps = require('./routes/progReps');
var activities = require('./routes/activities');
var kpis = require('./routes/kpis');
var boardKpis = require('./routes/boardkpis');
var kpiEvidenceUpload = require('./routes/kpiEvidenceUpload');


var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// UPLOAD FUNCTION FOR EVIDENCE FILES
app.use(multer({
    dest: __dirname + '/evidenceUploads',
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
}));


app.use(session( { secret: 'cmistratplansecret', saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */
 // load routes and pass in app and fully configured passport
 require('./routes/passport')(app, passport);

// serve index and view partials
app.get('/', routes.index);
app.get('/admin', routes.adminIndex);
app.get('/deptHead', routes.deptHeadIndex);
app.get('/partials/:name', routes.partials);
app.get('/admin/partials/:name', adminIsLoggedIn, routes.adminPartials);
app.get('/deptHead/partials/:name', deptIsLoggedIn, routes.deptHeadPartials);


// JSON API
app.get('/api/userData', api.userData);
app.use('/api/goals', goals);
app.use('/api/objectives', objectives);
app.use('/api/users', users);
app.use('/api/budgets', budgets);
app.use('/api/progReps', progReps);
app.use('/api/activities', activities);
app.use('/api/kpis', kpis);
app.use('/api/boardkpis', boardKpis);
app.use('/api/kpiEvidenceUpload', kpiEvidenceUpload);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Middleware to check authorization
function deptIsLoggedIn(req, res, next) {
  if(req.isAuthenticated() && req.user.access_group === 'dept')
      return next();
  res.redirect('/login');
};

function adminIsLoggedIn(req, res, next) {
  if(req.isAuthenticated() && req.user.access_group === 'admin')
      return next();
  res.redirect('/login');
};



/**
 * Start Server
 */

models.sequelize.sync().then(function () {
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
});
