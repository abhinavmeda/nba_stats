import { Collection, MongoClient } from "mongodb"
import dotenv from "dotenv"
dotenv.config()

const URI = process.env.MONGO_URI!
let players: Collection

// Object to be used in index.ts in order to begin express server or not

// Structure and snippet from
// https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial

const dbConnect = {
    connectToServer: (callback: Function) => {
        
        // MongoClient.connect(url: string): Promise<MongoClient> 
        // The generic type of the Promise should correspond to the non-error return-type
        // FROM: https://stackoverflow.com/questions/41078809/typescript-promise-generic-type

        // If the promise is resolved will give us a MongoClient object with properties and
        // methods defined https://mongodb.github.io/node-mongodb-native/4.13/classes/MongoClient.html#db
        
        MongoClient.connect(URI)
        .then(result => {
            players = result.db('players').collection('22/23-regular-season')

            // Running the server listen code without passing anything as a parameter
            // Doing so will start the server since !err will be true
            return callback() 
        })
        .catch(err => {
            console.log(err)
            callback(err)
        })
    },
    getCollection: () => players
}

export {dbConnect}