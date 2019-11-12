const express = require('express');
const router = express.Router();
const pool = require('../database');

router.post('/add_tipos_caso', (req, res) =>{

    console.log("Tratando de agregar TipoCaso..")
    console.log("TipoCaso: " + req.body.TipoCaso)
    console.log("TiempoEstimado: " + req.body.TiempoEstimado)
    console.log("TiempoReal: " + req.body.TiempoReal)
    console.log("IdPasosCaso: " + req.body.IdPasosCaso)

    const TipoCaso = req.body.TipoCaso 
    const TiempoEstimado = req.body.TiempoEstimado
    const TiempoReal = req.body.TiempoReal
    const IdPasosCaso = req.body.IdPasosCaso

    const queryString = "INSERT INTO tipocaso (TipoCaso, TiempoEstimado, TiempoReal, IdPasosCaso) VALUES (?, ?, ?,(SELECT IdPasosCaso FROM pasoscaso WHERE Paso = ? ))"
    pool.query(queryString, [TipoCaso, TiempoEstimado, TiempoReal, IdPasosCaso ], (err, results, fields) =>{
        if (err){
            console.log("Error, el TipoCaso: "+ err)
            res.json({ status: 500 })
            return
        }
        res.sendStatus(200)
        console.log("Se agrego TipoCaso con id: ", results.insertId);
        res.end() 
        
    } )
});

router.put('/edit_tipos_caso/:id', (req, res) =>{

    //Conexion 
    console.log("Tratando de editar TipoCaso..")
    console.log("TipoCaso: " + req.body.TipoCaso)
    console.log("TiempoEstimado: " + req.body.TiempoEstimado)
    console.log("TiempoReal: " + req.body.TiempoReal)
    console.log("IdPasosCaso: " + req.body.IdPasosCaso)

    const IdTipoCaso = req.params.id
    const TipoCaso = req.body.TipoCaso 
    const TiempoEstimado = req.body.TiempoEstimado
    const TiempoReal = req.body.TiempoReal
    const IdPasosCaso = req.body.IdPasosCaso
    
    console.log(IdTipoCaso)
    const queryString = "UPDATE tipocaso SET TipoCaso = ?, TiempoEstimado = ?, TiempoReal = ?, IdPasosCaso = (SELECT IdPasosCaso FROM pasoscaso WHERE Paso = ? ) WHERE IdTipoCaso = ?"
    pool.query(queryString, [TipoCaso, TiempoEstimado, TiempoReal, IdPasosCaso, IdTipoCaso], (err, results, fields) =>{
        if (err){
            console.log("Error al editar TipoCaso: "+ err)
            res.json({ status: 400 })
            return
        }
        console.log("Se edito TipoCaso con id: ", results.affectedRows);
        res.end() 
        
    })
});

router.delete('/delete_tipos_caso/:id', (req, res) => {
    console.log("Eliminar TipoCaso con id: "+ req.params.id)

    const IdTipoCaso = req.params.id
    const queryString = "DELETE FROM tipocaso WHERE IdTipoCaso =?"
    pool.query(queryString, [IdTipoCaso],(err, rows, fields) => {
        if(err){
            console.log("No existe el TipoCaso " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("TipoCaso Eliminado")
        res.json(rows)
    })
});

router.get('/tipo_caso/:id', (req, res) => {
    console.log("Seleccionar TipoCaso con id: "+ req.params.id)

    const IdTipoCaso= req.params.id
    
    const queryString = "SELECT t.TipoCaso, t.TiempoEstimado, t.TiempoReal, p.Paso FROM tipocaso AS t INNER JOIN pasoscaso as p ON t.IdPasosCaso = p.IdPasosCaso WHERE IdTipoCaso = ?"
    pool.query(queryString, [IdTipoCaso],(err, rows, fields) => {
        if(err){
            console.log("No existe el TipoCaso " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("TipoCaso Seleccionada")
        res.json(rows)
    })
});

router.get('/tipos_caso', (req, res) => {
    console.log("Seleccionar todos los tipos_caso")

    const queryString = "SELECT t.TipoCaso, t.TiempoEstimado, t.TiempoReal, p.Paso FROM tipocaso AS t INNER JOIN pasoscaso as p ON t.IdPasosCaso = p.IdPasosCaso"
    pool.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay tipo_caso " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("tipo_caso Seleccionados")
        res.json(rows)
    })
});

module.exports = router;