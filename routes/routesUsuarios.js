const express = require('express');
const {MongoClient, ObjectId}= require('mongodb');
const bodyParser = require('body-parser');
const usuarioService = require('../services/usuarioService');
const router = express.Router();
// const uri = "mongodb+srv://user123:user321@cluster0.scoehft.mongodb.net/?retryWrites=true&w=majority";  
const service = new usuarioService

//find all usuarios
router.get('/', async (req, res) =>{
    const usuarios = await service.find()
    if (usuarios) {
        res.status(200).send(usuarios)
    } else {
        res.status(404).send("No se encontraron los usuarios")
    }
})

router.get('/:id', async (req, res) =>{
    const id = req.params.id
    const usuario = await service.findOne(id)
    if (usuario) {
        res.status(200).send(usuario)
    } else {
        res.status(404).send(`No se encontro el usuario con el id:${id}`)
    }
})

//insertOne usuario
router.post("/addUsuario", async (req, res) =>{
    const result = await service.add(req.body)
    if (result) {
        res.status(200).json({
            message:"Se agrego un nuevo usuario",result
        })
    } else {
        res.status(404).send("Error al agregar el usuario")
    }
})

//inserMany
router.post("/addUsuarios", async (req, res) =>{
    const result = await service.addMany(req.body)
    if (result) {
        res.status(200).json({
            message:`Se agregaron los usuarios`
        })
    } else {
        res.status(404).send("Error al agregar los usuarios")
    }
})

//updateOne
router.patch('/:id', async (req, res) =>{
    const id = req.params.id
    const {nombre,apellido} = req.body
    const result = await service.update(id,nombre,apellido)
    if (result.modifiedCount > 0) {
        res.status(200).json({
            message:`Se actualizo el usuario con el id: ${id} `
        })
    } else {
        res.status(404).send("Error al intentar actualizar el usuario")
    }
})

//updateMany
router.patch('/updateUsuarios/:campoCond/:valorCond/', async (req, res) => {
    const {campoCond,valorCond} = req.params
    const {campoUpdate,valorUpdate} = req.body
    const condicion = `{"${campoCond}":"${valorCond}"}`
    const actualizacion = `{"${campoUpdate}":"${valorUpdate}"}`
    const result = await service.updateMany(condicion,actualizacion)
    if (result) {
        res.status(200).json({
            message:`Se actualizaron usuarios con la condicion:${condicion} `
        })
    } else {
        res.status(404).send("Error al intentar actualizar usuarios")
    }
})


//deleteOne
router.delete('/:id', async (req, res) =>{
    const id = req.params.id
    const result = await service.delete(id)
    if (result.acknowledged == true && result.deletedCount > 0) {
        res.status(200).json({
            message:`Se elimino el usuario con el id: ${id}`
        })
    } else {
        res.status(404).send("Error al intentar eliminar el usuario")
    }
})

//deleteMany
router.delete('/deleteUsuarios/:campo/:valor', async (req, res) =>{
    const {campo,valor} = req.params
    const condicion = campo+":"+valor
    const result = await service.deleteMany(condicion)
    console.dir(result)
    console.dir(condicion)
    if (result.acknowledged == true && result.deletedCount > 0) {
        res.status(200).json({
            message:`Se eliminaron los usuarios con la condicion: ${condicion} `
        })
    } else {
        res.status(404).send("Error al intentar eliminar usuarios")
    }
    // console.log(condicion)
})

module.exports = router;