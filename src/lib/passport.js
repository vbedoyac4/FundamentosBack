const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password)
    if (validPassword) {
      done(null, user, req.flash('success', 'Welcome ' + user.user));
      //console.log("Logueado");
    } else {
      done(null, false, req.flash('message', 'Incorrect Password'));
      //console.log("Password mal");
    }
  } else {
    return done(null, false, req.flash('message', 'The Username does not exists.'));
    //console.log("Usuario no existe");
  }
}));

passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {

  const {nombre} = req.body;
  const {apellido} = req.body;
  const {email} = req.body;
  const {idrol} = req.body;
  let newUser = {
    username,
    password,
    nombre,
    apellido,
    email,
    idrol
  };
  
  newUser.password = await helpers.encryptPassword(password);
  // Saving in the Database
  const result = await pool.query('INSERT INTO users SET ? ', newUser);
  newUser.id = result.insertId;
  return done(null, newUser);
}));

passport.use('local.update', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  if (rows.length > 0) {
    const user = rows[0];
    password = await helpers.encryptPassword(password);
    const result = await pool.query('UPDATE users SET password = ? WHERE username = ? ', [password, username]);
    return done(null, user);
  }}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});

