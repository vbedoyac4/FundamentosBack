const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/agregado',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.post('/signin', (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/error',
    failureFlash: true
  })(req, res, next);
});


router.get('/profile', (req, res) => {
  console.log("Logueado");
});

router.get('/agregado', (req, res) => {
  console.log("Agregado");
});

router.get('/error', (req, res) => {
  console.log("Error ");
});
module.exports = router;
