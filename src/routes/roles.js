const express = require('express');
const router = express.Router();
const pool = require('../database');

router.post('/add_rol', (req, res) =>{

    console.log("Tratando de agregar rol..")
    console.log("Rol: " + req.body.rol)

    const rol = req.body.rol

    const queryString = "INSERT INTO roles (rol)  VALUES  (?)"
    pool.query(queryString, [rol], (err, results, fields) =>{
        if (err){
            console.log("Error, el rol: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego rol con id: ", results.insertId);
        res.end() 
        
    } )
});

router.put('/edit_rol/:id', (req, res) =>{

    //Conexion 
    console.log("Tratando de editar rol..")
    console.log("Rol: " + req.body.rol)
   
    const idroles = req.params.id
    const rol = req.body.rol
    
    console.log(idroles)
    const queryString = "UPDATE roles SET rol = ? WHERE idroles = ?"
    pool.query(queryString, [rol, idroles], (err, results, fields) =>{
        if (err){
            console.log("Error al editar rol: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito rol con id: ", results.affectedRows);
        res.end() 
        
    })
});

router.delete('/delete_rol/:id', (req, res) => {
    console.log("Eliminar rol con id: "+ req.params.id)

    const idroles = req.params.id
    const queryString = "DELETE FROM roles WHERE idroles =?"
    pool.query(queryString, [idroles],(err, rows, fields) => {
        if(err){
            console.log("No existe el rol " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Rol Eliminado")
        res.json(rows)
    })
});

router.get('/rol/:rol', (req, res) => {
    console.log("Seleccionar rol con id: "+ req.params.id)

    const idroles= req.params.id
    const queryString = "SELECT rol FROM roles WHERE rol = ?"
    pool.query(queryString, [idroles],(err, rows, fields) => {
        if(err){
            console.log("No existe el rol " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Rol Seleccionada")
        res.json(rows)
    })
});

router.get('/roles', (req, res) => {
    console.log("Seleccionar todos los roles")

    const queryString = "SELECT rol FROM roles"
    pool.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay roles " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Roles Seleccionados")
        res.json(rows)
    })
});

module.exports = router;