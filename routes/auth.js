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
        clientID: '60f9c34925eb9239764d',
        clientSecret: 'f9c4672c848082dc5516f35afd244617ff57bed3',
        callbackURL: "http://www.deejay0921.top/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ githubId: profile.id }, function (err, user) {
        //     return cb(err, user);
        // });
        done(null,profile)
    }
));

router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        req.session.user = {
            id: req.user.id,
            username: req.user.displayName || req.user.username,
            avatar: req.user._json.avatar_url,
            provider: req.user._json.provider
        }
        res.redirect('/');
    });

router.get('/logout', function (req,res) {
    req.session.destroy()
    res.redirect('/')
});



module.exports = router
