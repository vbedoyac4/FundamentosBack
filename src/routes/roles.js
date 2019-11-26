const express = require('express');
const router = express.Router();
const pool = require('../database');

router.post('/add_rol', (req, res) => {

    console.log("Tratando de agregar rol..")
    console.log("Rol: " + req.body.rol)

    const rol = req.body.rol
    const deptoid = req.body.deptoid

    const queryString = "INSERT INTO roles (rol, deptoid)  VALUES  (?, ?)"
    pool.query(queryString, [rol, deptoid], (err, results, fields) => {
        if (err) {
            console.log("Error, el rol: " + err)
            res.json({ status: 500 })
            return
        }
        console.log("Se agrego rol con id: ", results.insertId);
        res.json({ status: 200 })

    })
});

router.put('/edit_rol/:id', (req, res) => {

    //Conexion 
    console.log("Tratando de editar rol..")
    console.log("Rol: " + req.body.rol)

    const idroles = req.params.id
    const rol = req.body.rol
    const deptoid = req.body.deptoid

    console.log(idroles)
    const queryString = "UPDATE roles SET rol = ?, deptoid = ? WHERE idroles = ?"
    pool.query(queryString, [rol, deptoid, idroles], (err, results, fields) => {
        if (err) {
            console.log("Error al editar rol: " + err)
            res.json({ status: 400 })
            return
        }
        console.log("Se edito rol con id: ", results.affectedRows);
        res.json({ status: 200 })

    })
});

router.delete('/delete_rol/:id', (req, res) => {
    console.log("Eliminar rol con id: " + req.params.id)

    const idroles = req.params.id
    const queryString = "DELETE FROM roles WHERE idroles =?"
    pool.query(queryString, [idroles], (err, rows, fields) => {
        if (err) {
            console.log("No existe el rol " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("Rol Eliminado")
        res.json(rows)
    })
});

router.get('/rol/:id', (req, res) => {
    console.log("Seleccionar rol con id: " + req.params.id)

    const idroles = req.params.id
    const queryString = "SELECT * FROM roles WHERE idroles = ?"
    pool.query(queryString, [idroles], (err, rows, fields) => {
        if (err) {
            console.log("No existe el rol " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("Rol Seleccionada")
        res.json(rows)
    })
});

router.get('/getRolesByDepto/:id', (req, res) => {
    console.log("Seleccionar roles con iddepto: " + req.params.id)

    const DeptoId = req.params.id
    const queryString = "SELECT * FROM roles WHERE deptoid = ?"
    pool.query(queryString, [DeptoId], (err, rows, fields) => {
        if (err) {
            console.log("No existen los roles " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("Roles Seleccionados")
        res.json(rows)
    })
});

router.get('/roles', (req, res) => {
    console.log("Seleccionar todos los roles")

    const queryString = "select r.idroles, r.rol, r.deptoid, d.Departamento from roles r inner join departamento d on r.deptoid = d.IdDepartamento order by r.idroles"
    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("No hay roles " + err)
            res.json({ status: 500 })
            res.end()
            return
        }
        console.log("Roles Seleccionados")
        res.json(rows)
    })
});

module.exports = router;