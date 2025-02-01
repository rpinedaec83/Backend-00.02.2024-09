import express from "express"
import { couponRouter } from "../routes/couponRoutes.js"
import { courseRouter } from "../routes/courseRoutes.js"
import "dotenv/config"
import { connectDB } from "../config/db.js"

export class Server{
    constructor() {
        this.port = process.env.PORT || 3000
        this.app = express()
        connectDB()
        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(express.json())
    }

    routes() {

        this.app.use('/coupon', couponRouter)
        this.app.use('/course', courseRouter)
    
        this.app.get('/',(req,res) => {
            res.send("<h1>Servidor</h1>")
        })

        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en puerto http://localhost:${this.port}`);
    });
    }
}