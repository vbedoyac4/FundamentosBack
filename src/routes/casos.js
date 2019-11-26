const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/tipocasos', (req, res) => {
    console.log("Entro al metodo TipoCasos")

    const queryString = "SELECT * FROM tipocaso"
    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("No hay tipo casos " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("Tipos de Caso Seleccionados")
        res.json(rows)
    })
});

router.get('/tiposolicitud', (req, res) => {
    console.log("Entro al metodo TipoSolicitud")

    const queryString = "SELECT * FROM tiposolicitud"
    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("No hay Tipo Solicitud " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("Tipo de Solicitud Seleccionados")
        res.json(rows)
    })
});

router.get('/prioridad', (req, res) => {
    console.log("Entro al metodo Prioridad")

    const queryString = "SELECT * FROM prioridad"
    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("No hay Tipo Prioridad " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("Prioridad Seleccionados")
        res.json(rows)
    })
});

module.exports = router