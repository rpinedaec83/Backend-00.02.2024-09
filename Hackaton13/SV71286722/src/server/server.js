import express from "express"

export class Server{
    constructor() {
        this.port = process.env.PORT || 3000
        this.app = express()
        this.routes()
    }

    routes() {
    
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