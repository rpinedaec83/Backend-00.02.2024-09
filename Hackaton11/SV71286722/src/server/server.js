import express from "express"
import clientesRoutes from "../routes/clientes.route.js"

export class Server{
    constructor() {
        this.port = process.env.PORT
        this.app = express()
        this.routes()
    }

    routes() {
    
        this.app.get('/',(req,res) => {
            res.send("<h1>Servidor</h1>")
        })

        this.app.use(express.json())
        this.app.use('/clientes', clientesRoutes)

        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en puerto http://localhost:${this.port}`);
    });
    }
}