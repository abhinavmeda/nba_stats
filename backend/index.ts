import express, { Express, Request, Response, NextFunction} from "express"
import dotenv from "dotenv"

dotenv.config()

const app: Express = express()
const PORT = parseInt(process.env.PORT!, 10)

app.use((req:Request, res:Response, next:NextFunction) => {
    console.log(`PATH: ${req.path} METHOD: ${req.method}`)
    next()
})

app.get('/', (req: Request, res: Response) => {
    res.send("Hello from typescript!!!!")
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`)
})
