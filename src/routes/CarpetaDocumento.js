const express = require('express');
const router = express.Router();
const pool = require('../database');

router.post('/carpeta/AddCarpeta', (req, res) => {

    console.log("Tratando de agregar carpeta..")
    console.log("Carpeta: " + req.body.descripcion)
    console.log("ProcesoId: " + req.body.procesoId)
    console.log("Sucesor: " + req.body.sucesor)

    const descripcion = req.body.descripcion
    const procesoId = req.body.procesoId
    const sucesor = req.body.sucesor

    const queryString = "INSERT INTO carpeta (descripcion, procesoid, sucesor)  VALUES  (?,?,?)"
    pool.query(queryString, [descripcion, procesoId, sucesor], (err, results, fields) => {
        if (err) {
            console.log("Error, la carpeta: " + err)
            res.json({ status: 500 })
            return
        }
        console.log("Se agrego la carpeta con exito.");
        res.json({ status: 200 })

    })
});

router.get('/carpetas', (req, res) => {
    console.log("Seleccionar todas las carpetas")

    const queryString = "SELECT * FROM carpeta"
    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("No hay carpetas " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("carpetas Seleccionados")
        res.json(rows)
    })
});

router.get('/carpetas/estrategicas', (req, res) => {
    console.log("Seleccionar carpetas Estrategicas")

    const queryString = "SELECT * FROM carpeta WHERE sucesor = 0 AND procesoid = 1"
    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("No hay carpetas " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("carpetas Seleccionadas")
        res.json(rows)
    })
});

router.get('/carpetas/operativas', (req, res) => {
    console.log("Seleccionar carpetas Operativas")

    const queryString = "SELECT * FROM carpeta WHERE sucesor = 0 AND procesoid = 2"
    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("No hay carpetas " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("carpetas Seleccionados")
        res.json(rows)
    })
});

router.get('/carpetas/soporte', (req, res) => {
    console.log("Seleccionar carpetas de Soporte")

    const queryString = "SELECT * FROM carpeta WHERE sucesor = 0 AND procesoid = 3"
    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("No hay carpetas " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("carpetas Seleccionados")
        res.json(rows)
    })
});

router.get('/carpetas/:id', (req, res) => {
    console.log("Seleccionar Carpetas por Id")

    const sucesor = req.params.id
    const queryString = "SELECT * FROM carpeta where sucesor = ?"
    pool.query(queryString, [sucesor], (err, rows, fields) => {
        if (err) {
            console.log("Este sucesor no tiene carpetas creadas")
            res.json({ status: 500 })
            res.end()
            return
        }
        if (rows != '') {
            console.log("Carpetas Seleccionadas")
            res.json(rows)
        } else {
            console.log("Respondio vacio.")
            res.json('')
        }

    })
});

module.exports = router