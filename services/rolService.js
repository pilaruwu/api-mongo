require("dotenv").config()
const {MongoClient, ObjectId} = require("mongodb")
const uri = "mongodb+srv://user123:user321@cluster0.scoehft.mongodb.net/";

class rolService{
    constructor(){}

    async find(){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const roles = client.db("constru-tech").collection("Roles").find({}).limit(20).sort({_id:-1}).toArray()
            if(roles){
                return roles                
            }
        } catch (error) {
            console.log(error)
        }
    }

    async findOne(id){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const rol = client.db("constru-tech").collection("Roles").findOne({_id: new ObjectId(id)})
            if(rol){
                return rol                
            }
        } catch (error) {
            console.log(error)
        }
    }

    async add(body){
        const client = new MongoClient(uri)
        try {
            await client.connect();
            const result = await client.db("constru-tech").collection("Roles").insertOne(body)
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addMany(arrayRoles){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db("constru-tech").collection("Roles").insertMany(arrayRoles)
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

    async update(id,nombreRol,nombrePermiso){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db("constru-tech").collection("Roles").updateOne({_id: new ObjectId(id)},{$set:{nombreRol:nombreRol,nombrePermiso:nombrePermiso}})
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
            const result = await client.db("constru-tech").collection("Roles").updateMany({condicion},{$set:{actualizacion}})
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
            const result = await client.db("constru-tech").collection("Roles").deleteOne({_id: new ObjectId(id)})
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
            const result = await client.db("constru-tech").collection("Roles").deleteMany({condicion})
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

}


module.exports = rolService;