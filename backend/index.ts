import express, { Express, Request, Response, NextFunction} from "express"
import dotenv from "dotenv"
import { Collection, Document } from "mongodb"
dotenv.config()

import { dbConnect } from "./db"

const app: Express = express()
const PORT = parseInt(process.env.PORT!, 10)

let collection: Collection<Document> 

// The callback function runs the code to start the server
dbConnect.connectToServer((err: any) => {
    if(!err){
        console.log(err)
        collection = dbConnect.getCollection()
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}!`)
        })
    }
    else{
        console.log("ERRRRORRRRRRRRR:::::::: ", err)
    }
})

app.use((req:Request, res:Response, next:NextFunction) => {
    console.log(`PATH: ${req.path} METHOD: ${req.method}`)
    next()
})
app.get('/', (req: Request, res: Response) => {
    collection.countDocuments()
    .then(result => res.send(`Num: ${result}`))
    .catch(err => console.log(err))
})
