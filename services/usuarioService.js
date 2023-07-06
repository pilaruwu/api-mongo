require("dotenv").config()
const {MongoClient, ObjectId} = require("mongodb")
const uri = "mongodb+srv://user123:user321@cluster0.scoehft.mongodb.net/";

class usuarioService{
    constructor(){}

    async find(){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const usuarios = client.db("constru-tech").collection("Usuarios").find({}).limit(20).sort({_id:-1}).toArray()
            if(usuarios){
                return usuarios                
            }
        } catch (error) {
            console.log(error)
        }
    }

    async findOne(id){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const usuario = client.db("constru-tech").collection("Usuarios").findOne({_id: new ObjectId(id)})
            if(usuario){
                return usuario                
            }
        } catch (error) {
            console.log(error)
        }
    }

    async add(body){
        const client = new MongoClient(uri)
        try {
            await client.connect();
            const result = await client.db("constru-tech").collection("Usuarios").insertOne(body)
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addMany(arrayUsuarios){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db("constru-tech").collection("Usuarios").insertMany(arrayUsuarios)
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

    async update(id,nombre,apellido){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db("constru-tech").collection("Usuarios").updateOne({_id: new ObjectId(id)},{$set:{nombre:nombre,apellido:apellido}})
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

    async updateMany(condicion, actualizacion){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db("constru-tech").collection("Usuarios").updateMany({condicion},{$set:{actualizacion}})
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

    async delete(id){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db("constru-tech").collection("Usuarios").deleteOne({_id: new ObjectId(id)})
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    async deleteMany(condicion){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db("constru-tech").collection("Usuarios").deleteMany({condicion})
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

}


module.exports = usuarioService;