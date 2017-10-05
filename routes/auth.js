var express = require('express')
var path = require('path')
var router = express.Router()

var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy


passport.serializeUser(function (user, done) {
    console.log('-----serializeUser------')
    console.log(user)
    done(null,user)
})
passport.deserializeUser(function (obj, done) {
    console.log('------deserializeUser')
    done(null,obj)
})


passport.use(new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ githubId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

router.get('/auth/github',
    passport.authenticate('github'));

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        req.session.user = {
            id: req.user._json.uid,
            username: req.user._json.name,
            avatar: req.user._json.avatar,
            provider: req.user._json.provider
        }
        res.redirect('/');
    });

router.get('/logout', function (req,res) {
    req.session.destroy()
    res.redirect('/')
});



module.exports = router