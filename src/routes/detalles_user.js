const express = require('express');
const router = express.Router();
const pool = require('../database');

router.post('/add_detalle_user', (req, res) =>{

    console.log("Tratando de agregar detalle_user..")
    console.log("IdRol: " + req.body.idrol)
    console.log("IdUser: " + req.body.id)
    console.log("IdUserModif: " + req.body.id_user_modif)

    const idrol = req.body.idrol
    const id = req.body.id
    const id_user_modif = req.body.id_user_modif
    

    const queryString = "INSERT INTO detalle_user (idrol, id, id_user_modif, fecha_mod) VALUES ((SELECT idroles FROM roles WHERE rol = ?),(SELECT id FROM users WHERE username = ?),(SELECT id FROM users WHERE username = ?),(CURDATE()))"
    pool.query(queryString, [idrol, id, id_user_modif], (err, results, fields) =>{
        if (err){
            console.log("Error, el detalle_user: "+ err)
            res.json({ status: 500 })
            return
        }
        console.log("Se agrego detalle_user con id: ", results.insertId);
        res.end() 
        
    } )
});

router.put('/edit_detalle_user/:id', (req, res) =>{

    console.log("Tratando de agregar detalle_user..")
    console.log("IdRol: " + req.body.idrol)
    console.log("IdUser: " + req.body.id)
    console.log("IdUserModif: " + req.body.id_user_modif)

    const iddetalle_user = req.params.id
    const idrol = req.body.idrol
    const id = req.body.id
    const id_user_modif = req.body.id_user_modif
       
    console.log(iddetalle_user)
    const queryString = "UPDATE detalle_user SET idrol = (SELECT idroles FROM roles WHERE rol = ?), id = (SELECT id FROM users WHERE username = ?), id_user_modif = (SELECT id FROM users WHERE username = ?), fecha_mod = (CURDATE()) WHERE iddetalle_user = ?"
    pool.query(queryString, [idrol, id, id_user_modif,iddetalle_user], (err, results, fields) =>{
        if (err){
            console.log("Error al editar detalle_user: "+ err)
            res.sendStatus(400)
            return
        }
        console.log("Se edito detalle_user. con id: ", results.affectedRows);
        res.end() 
        
    })
});

router.delete('/delete_detalle_user/:id', (req, res) => {
    console.log("Eliminar detalle_user con id: "+ req.params.id)

    const iddetalle_user = req.params.id
    const queryString = "DELETE FROM detalle_user WHERE iddetalle_user =?"
    pool.query(queryString, [iddetalle_user],(err, rows, fields) => {
        if(err){
            console.log("No existe el detalle_user " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("Detalle_user Eliminado")
        res.json(rows)
    })
});

//Seleccionar detalles de un usuario
router.get('/get_roles_user/:id', (req, res) => {
    console.log("Seleccionar detalle_user con id: "+ req.params.id)

    const id= req.params.id
    
    const queryString = "SELECT concat_ws(' ', u.nombre, u.apellido) as Nombre, u.username as Usuario, r.rol as Rol , d.fecha_mod as Fecha_Mod FROM detalle_user as d INNER JOIN users as u ON d.id = u.id INNER JOIN roles as r ON d.idrol = r.idroles WHERE d.id = (SELECT id FROM users WHERE username = ?);"
    pool.query(queryString, [id],(err, rows, fields) => {
        if(err){
            console.log("No existe el detalle_user " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("Detalle_user Seleccionada")
        res.json(rows)
    })
});

module.exports = router;