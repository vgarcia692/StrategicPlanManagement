module.exports = function(app, passport) {

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/',
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true
    }));

    app.post('/login', passport.authenticate('local-login', {
        // TODO Change all view2/view3..etc to their respective name without making it the same as API routes
        successRedirect : 'back',
        failureRedirect : 'back',
        failureFlash : true
    }));

    app.get('/login', function(req,res) {
        res.render('login', { message: req.flash('loginMessage')});
    });

    app.get('/signup', function(req,res) {
        res.render('signup', { message: req.flash('signupMessage')});
    });

    app.get('/logout', function(req,res) {
        req.logout();
        res.redirect('/');
    });

};
