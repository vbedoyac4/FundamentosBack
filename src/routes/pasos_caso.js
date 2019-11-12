const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');


router.post('/add_pasoscaso', (req, res) =>{

    console.log("Tratando de agregar pasoscaso..")
    console.log("Paso: " + req.body.Paso)
    console.log("NumeroPaso: " + req.body.NumeroPaso)
    console.log("IdDepartamento: " + req.body.IdDepartamento)
    console.log("Estado: " + req.body.Estado)
    console.log("IdUser: " + req.body.IdUser)

    const Paso = req.body.Paso
    const NumeroPaso =  req.body.NumeroPaso
    const IdDepartamento = req.body.IdDepartamento
    const Estado = req.body.Estado
    const IdUser = req.body.IdUser

    const queryString = "INSERT INTO pasoscaso (Paso, NumeroPaso, IdDepartamento, Estado, IdUser)  VALUES  (?, ?, (SELECT IdDepartamento FROM Departamento WHERE Departamento = ?), ? ,(SELECT id FROM users WHERE username = ?))"
    pool.query(queryString, [Paso, NumeroPaso, IdDepartamento, Estado, IdUser], (err, results, fields) =>{
        if (err){
            console.log("Error, el pasoscaso: "+ err)
            res.json({ status: 500 })
            return
        }
        console.log("Se agrego pasoscaso con id: ", results.insertId);
        res.end() 
        
    } )
});

router.put('/edit_pasoscaso/:id', (req, res) =>{

    //Conexion 
    console.log("Tratando de editar pasoscaso..")
    console.log("Paso: " + req.body.Paso)
    console.log("NumeroPaso: " + req.body.NumeroPaso)
    console.log("IdDepartamento: " + req.body.IdDepartamento)
    console.log("Estado: " + req.body.Estado)
    console.log("IdUser: " + req.body.IdUser)
   
    const IdPasosCaso = req.params.id
    const Paso = req.body.Paso
    const NumeroPaso =  req.body.NumeroPaso
    const IdDepartamento = req.body.IdDepartamento
    const Estado = req.body.Estado
    const IdUser = req.body.IdUser
    
    console.log(IdPasosCaso)
    const queryString = "UPDATE pasoscaso SET Paso = ?, NumeroPaso = ?, IdDepartamento = (SELECT IdDepartamento FROM Departamento WHERE Departamento = ? ), Estado = ?, IdUser = (SELECT Id FROM users WHERE username = ?) WHERE IdPasosCaso = ?"
    pool.query(queryString, [Paso, NumeroPaso, IdDepartamento, Estado, IdUser, IdPasosCaso], (err, results, fields) =>{
        if (err){
            console.log("Error al editar pasoscaso: "+ err)
            res.json({ status: 400 })
            return
        }
        console.log("Se edito pasoscaso con id: ", results.affectedRows);
        res.end() 
        
    })
});

router.delete('/delete_pasoscaso/:id', (req, res) => {
    console.log("Eliminar pasoscaso con id: "+ req.params.id)

    const IdPasosCaso = req.params.id
    const queryString = "DELETE FROM pasoscaso WHERE IdPasosCaso = ?"
    pool.query(queryString, [IdPasosCaso],(err, rows, fields) => {
        if(err){
            console.log("No existe el pasoscaso " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("pasoscaso Eliminado")
        res.json(rows)
    })
});

router.get('/pasoscaso/:id', (req, res) => {
    console.log("Seleccionar pasoscaso con id: "+ req.params.id)

    const IdPasosCaso = req.params.id
    
    const queryString = "SELECT p.Paso, p.NumeroPaso, d.Departamento, p.Estado, u.username FROM pasoscaso AS p INNER JOIN Departamento AS d ON p.IdDepartamento = d.IdDepartamento INNER JOIN users AS u ON p.IdUser = u.id WHERE IdPasosCaso = ? "
    pool.query(queryString, [IdPasosCaso],(err, rows, fields) => {
        if(err){
            console.log("No existe el pasoscaso " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("pasoscaso Seleccionada")
        res.json(rows)
    })
});

router.get('/pasoscasos', (req, res) => {
    console.log("Seleccionar todos los pasoscasos")

    const queryString = "SELECT p.Paso, p.NumeroPaso, d.Departamento, p.Estado, u.username FROM pasoscaso AS p INNER JOIN Departamento AS d ON p.IdDepartamento = d.IdDepartamento INNER JOIN users AS u ON p.IdUser = u.id"
    pool.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay pasoscasos " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("pasoscasos Seleccionados")
        res.json(rows)
    })
});

module.exports = router;

