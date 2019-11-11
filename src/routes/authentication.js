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
    successRedirect: '/home/dashboard',
    failureRedirect: '/error',
    failureFlash: true,
  }, )(req, res, next);  
});

router.put('/update', (req, res, next) => {
  passport.authenticate('local.update', {
    successRedirect: '/updated',
    failureRedirect: '/error',
    failureFlash: true
  })(req, res, next);
});


router.get('/home/dashboard', (req, res) => {
  console.log("User Logueado");
  res.sendStatus(200)
});

router.get('/agregado', (req, res) => {
  console.log("User Agregado");
  res.sendStatus(200)
});

router.get('/singup', (req, res) => {
  console.log("User added");
  res.sendStatus(200)
});

router.get('/error', (req, res) => {
  console.log("Error");
  res.sendStatus(500)
});


router.get('/updated', (req, res) => {
  console.log("Password Updated ");
  res.sendStatus(200)
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('signin');
  res.sendStatus(200)
  console.log("Logged out");
});

module.exports = router;
