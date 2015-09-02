var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var models = require('../models');
var User = models.User;

module.exports = function(passport) {

    passport.serializeUser(function(User, done) {
        console.log('serializeUser, id: ' + User)
        done(null, User.id);
    });

    passport.deserializeUser(function(id, done) {
        User.find(
            {
                where: {id: id}
            })
            .then(function(user) {
                done(null,user);
            }).error(function(err) {
                    done(err, null);
                });
    });

    //===================SIGNUP============================
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
        function(req, username, password, done) {
            console.log('signing up..');
            process.nextTick(function() {
                User.find({ where: {email: username} }).then(function(user) {
                    if(user) {
                        return done(null, false, req.flash('signupMessage', 'User already exist'));
                    } else {
                        User.create({email: username, password: User.generateHash(password), f_name: req.body.f_name, 
                                    l_name: req.body.l_name, department: req.body.department, access_group: req.body.access_group})
                                    .then(function(user){
                                    return done(null, user);
                        });
                    }
                });
            })
    }));

    //===================LOGIN============================
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, username, password, done) {
        User.find(
            { 
                where: {email: username}            })
            .then(function(user) {
                if(!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }
                // Not using the validPassword method in user model because keep getting type error
                // Instead put bcrypt right in the conditional statement now it works.
                else if(!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, req.flash('loginMessage', 'Opps! Wrong password.'));
                }
                else {
                    console.log(user);
                    return done(null, user);
                }
        });
    }));

};



