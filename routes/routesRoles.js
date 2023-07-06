const express = require('express');
const {MongoClient, ObjectId}= require('mongodb');
const bodyParser = require('body-parser');
const rolService = require('../services/rolService');
const router = express.Router();
//const uri = "mongodb+srv://user123:user321@cluster0.scoehft.mongodb.net/?retryWrites=true&w=majority";
const service = new rolService

//find all roles
router.get('/', async (req, res) =>{
    const roles = await service.find()
    if (roles) {
        res.status(200).send(roles)
    } else {
        res.status(404).send("No se encontraron los roles")
    }
})

router.get('/:id', async (req, res) =>{
    const id = req.params.id
    const rol = await service.findOne(id)   
    if (rol) {
        res.status(200).send(rol)
    } else {
        res.status(404).send(`No se encontro el rol con el id:${id}`)
    }
})

//insertOne rol
router.post("/addRol", async (req, res) =>{
    const result = await service.add(req.body)
    if (result) {
        res.status(200).json({
            message:"Se agrego un nuevo rol",result
        })
    } else {
        res.status(404).send("Error al agregar el rol")
    }
})

//inserMany
router.post("/addRoles", async (req, res) =>{
    const result = await service.addMany(req.body)
    if (result) {
        res.status(200).json({
            message:`Se agregaron los roles`
        })
    } else {
        res.status(404).send("Error al agregar los roles")
    }
})

//updateOne
router.patch('/:id', async (req, res) =>{
    const id = req.params.id
    const {nombreRol,nombrePermiso} = req.body
    const result = await service.update(id,nombreRol,nombrePermiso)
    if (result.modifiedCount > 0) {
        res.status(200).json({
            message:`Se actualizo el rol con el id: ${id} `
        })
    } else {
        res.status(404).send("Error al intentar actualizar el rol")
    }
})

//updateMany
router.patch('/updateRoles/:campoCond/:valorCond/', async (req, res) => {
    const {campoCond,valorCond} = req.params
    const {campoUpdate,valorUpdate} = req.body
    const condicion = `{"${campoCond}":"${valorCond}"}`
    const actualizacion = `{"${campoUpdate}":"${valorUpdate}"}`
    const result = await service.updateMany(condicion,actualizacion)
    if (result) {
        res.status(200).json({
            message:`Se actualizaron roles con la condicion:${condicion} `
        })
    } else {
        res.status(404).send("Error al intentar actualizar roles")
    }
})


//deleteOne
router.delete('/:id', async (req, res) =>{
    const id = req.params.id
    const result = await service.delete(id)
    if (result.acknowledged == true && result.deletedCount > 0) {
        res.status(200).json({
            message:`Se elimino el rol con el id: ${id}`
        })
    } else {
        res.status(404).send("Error al intentar eliminar el rol")
    }
})

//deleteMany
router.delete('/deleteRoles/:campo/:valor', async (req, res) =>{
    const {campo,valor} = req.params
    const condicion = campo+":"+valor
    const result = await service.deleteMany(condicion)
    console.dir(result)
    console.dir(condicion)
    if (result.acknowledged == true && result.deletedCount > 0) {
        res.status(200).json({
            message:`Se eliminaron los roles con la condicion: ${condicion} `
        })
    } else {
        res.status(404).send("Error al intentar eliminar roles")
    }
    // console.log(condicion)
})




module.exports = router;