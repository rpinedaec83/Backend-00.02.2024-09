import "dotenv/config"
import express from "express"
import { messageRoute } from "../routes/message.route.js";
import { userRoute } from "../routes/user.route.js";

export class Server{
    constructor(){
        this.port = process.env.PORT || 3000;
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(express.json())
    }

    routes(){
        this.app.get('/', (req, res) => {
            res.json( {message:"Hello World!"} )
        })
        this.app.use('/message', messageRoute)
        this.app.use('/user', userRoute)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Listening on port http://localhost:${this.port}`)
        })
    }
}