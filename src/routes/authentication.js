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

router.put('/update', (req, res, next) => {
  passport.authenticate('local.update', {
    successRedirect: '/updated',
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

router.get('/updated', (req, res) => {
  console.log("Updated ");
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('signin');
  console.log("Logged out");
});

module.exports = router;
