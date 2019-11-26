const express = require('express');
const router = express.Router();
const pool = require('../database');
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
        failureRedirect: '/notFound',
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


router.get('/user/:id', (req, res) => {
    console.log("Seleccionar user con id: " + req.params.id)

    const id = req.params.id

    const queryString = "SELECT *  FROM users WHERE id = ?"
    pool.query(queryString, [id], (err, rows, fields) => {
        if (err) {
            console.log("No existe el user " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("User Seleccionada")
        res.json(rows)
    })
});

router.get('/DataUser/:id', (req, res) => {
    console.log("Seleccionar user con username: " + req.params.id)

    const username = req.params.id

    const queryString = "SELECT *  FROM users WHERE username = ?"
    pool.query(queryString, [username], (err, rows, fields) => {
        if (err) {
            console.log("No existe el user " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("User Seleccionada")
        res.json(rows)
    })
});

router.get('/users', (req, res) => {
    console.log("Seleccionar todos los users")

    const queryString = "SELECT concat_ws(' ', u.nombre, u.apellido) as Nombre, u.username, u.email, u.estado, u.id, u.rolid, r.rol, r.deptoid  FROM users u inner join roles r on u.rolid = r.idroles"
    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("No hay users " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("users Seleccionados")
        res.json(rows)
    })
});

router.get('/departamento/roles/:id', (req, res) => {
    console.log("Seleccionar roles con id: " + req.params.id)

    const id = req.params.id

    const queryString = "SELECT *  FROM roles WHERE deptoid = ?"
    pool.query(queryString, [id], (err, rows, fields) => {
        if (err) {
            console.log("No los roles " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("Roles Seleccionados")
        res.json(rows)
    })
});

router.get('/departamento', (req, res) => {
    console.log("Seleccionar todos los departamentos")

    const queryString = "SELECT * FROM departamento"
    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("No hay departamentos " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("departamentos Seleccionados")
        res.json(rows)
    })
});

router.get('/home/dashboard', (req, res) => {
    console.log("User Logueado");
    res.json({ status: 200 });
});

router.get('/agregado', (req, res) => {
    console.log("User Agregado");
    res.json({ status: 200 });
});

router.get('/singup', (req, res) => {
    console.log("User added");
    res.sendStatus(200)
});

router.get('/notFound', (req, res) => {
    console.log("notFound");
    res.json({ status: 404 });
});

router.get('/error', (req, res) => {
    console.log("Error");
    res.json({ status: 500 });
});


router.put('/updated', (req, res) => {
    console.log("Password Updated ");
    res.json({ status: 200 });
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('signin');
    res.sendStatus(200)
    console.log("Logged out");
});

module.exports = router;