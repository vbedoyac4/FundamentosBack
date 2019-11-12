const express = require('express');
const router = express.Router();
const pool = require('../database');

router.post('/add_comentarios', (req, res) =>{

    console.log("Tratando de agregar comentarios..")
    console.log("Comentario: " + req.body.Comentario)
    console.log("IdUser: " + req.body.IdUser)
    console.log("IdCaso: " + req.body.IdCaso)

    const Comentario = req.body.Comentario
    const IdUser = req.body.IdUser
    const IdCaso = req.body.IdCaso

    const queryString = "INSERT INTO comentarios (Comentario, IdUser, IdCaso)  VALUES  (?, (SELECT id FROM users WHERE username = ?), (SELECT IdCaso FROM casos WHERE Caso = ?))"
    pool.query(queryString, [Comentario, IdUser, IdCaso], (err, results, fields) =>{
        if (err){
            console.log("Error, el comentarios: "+ err)
            res.json({ status: 500 })
            return
        }
        console.log("Se agrego comentarios con id: ", results.insertId);
        res.end() 
        
    } )
});

router.put('/edit_comentarios/:id', (req, res) =>{

    //Conexion 
    console.log("Tratando de editar comentarios..")
    console.log("Comentario: " + req.body.Comentario)
    console.log("IdUser: " + req.body.IdUser)
    console.log("IdCaso: " + req.body.IdCaso)
   
    const IdComentarios = req.params.id
    const Comentario = req.body.Comentarios
    const IdUser = req.body.IdUser
    const IdCaso = req.body.IdCaso

    console.log(IdComentarios)
    const queryString = "UPDATE comentarios SET Comentario = ?, IdUser = (SELECT id FROM users WHERE username = ?), IdCaso = (SELECT IdCaso FROM casos WHERE Caso = ?) WHERE IdComentario = ?"
    pool.query(queryString, [Comentario, IdUser, IdCaso, IdComentarios], (err, results, fields) =>{
        if (err){
            console.log("Error al editar comentarios: "+ err)
            res.json({ status: 400 })
            return
        }
        console.log("Se edito comentarios con id: ", results.affectedRows);
        res.end() 
        
    })
});

router.delete('/delete_comentarios/:id', (req, res) => {
    console.log("Eliminar comentarios con id: "+ req.params.id)

    const IdComentarios = req.params.id
    const queryString = "DELETE FROM comentarios WHERE IdComentario =?"
    pool.query(queryString, [IdComentarios],(err, rows, fields) => {
        if(err){
            console.log("No existe el comentarios " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("Comentario Eliminado")
        res.json(rows)
    })
});

router.get('/comentario/:id', (req, res) => {
    console.log("Seleccionar comentarios con id: "+ req.params.id)

    const IdComentarios = req.params.id

    const queryString = "SELECT c.Comentario AS Comentario, u.username AS username, co.Caso AS Caso FROM comentarios AS c INNER JOIN users AS u ON c.IdUser = u.id INNER JOIN casos AS co ON c.IdCaso = co.IdCaso WHERE c.IdComentario = ?"
    pool.query(queryString, [IdComentarios],(err, rows, fields) => {
        if(err){
            console.log("No existe el comentarios " + err)
            res.json({ status: 500 })
            res.end()
            return
        }      
        console.log("Rol Seleccionada")
        res.json(rows)
    })
});

router.get('/comentarios', (req, res) => {
    console.log("Seleccionar todos los comentarioses")

    const queryString = "SELECT c.Comentario AS Comentario, u.username AS username, co.Caso AS Caso FROM comentarios AS c INNER JOIN users AS u ON c.IdUser = u.id INNER JOIN casos AS co ON c.IdCaso = co.IdCaso"
    pool.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay comentarioses " + err)
            res.json({ status: 500 })
            res.end()
            return
        }      
        console.log("Roles Seleccionados")
        res.json(rows)
    })
});

module.exports = router;