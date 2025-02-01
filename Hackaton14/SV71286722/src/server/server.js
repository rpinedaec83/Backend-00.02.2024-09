import "dotenv/config"
import express from "express"
import { Server as SocketServer } from "socket.io"
import { createServer } from "node:http"
import db from "./models/index.js"
import { GoogleChatbot } from "./chatbot/chatbot.js"

const bot = new GoogleChatbot()

export class Server{
    constructor(){
        this.port = process.env.PORT || 3000;
        this.app = express();
        this.server = createServer(this.app);
        this.io = new SocketServer(this.server, {
            connectionStateRecovery: {}
        })
        
        this.ioListen();
        this.routes();
    }

    routes(){

        this.app.get('/',(req, res)=>{
            res.sendFile(process.cwd() + '/src/client/index.html')
        })

        this.app.get('/ruta',(req, res)=>{
            res.json({message:"Prueba"})
        })

    }

    ioListen(){
        this.io.on('connection', async (socket) => {
            console.log('a user has connected!')

            socket.on('sendMessage', async (msg)=>{
                let botResponse = await bot.sendMessage(msg)
                await db.Messages.createMessage("user",msg)
                await db.Messages.createMessage("model",botResponse)
                this.io.emit('message', `Google: ${botResponse}`)
            })
          
            socket.on('disconnect', () => {
              console.log('a user has disconnected')
            })

            if(!socket.recovered){
                try{
                    const recoveredMessages = await db.Messages.getMessages()
                    recoveredMessages.forEach((msg)=>{
                        let role = msg.role
                        let message = msg.message
                        let name = role === 'user' ? 'Cliente' : 'Google'
                        this.io.emit('message', `${name} : ${message}`)
                    })
                    await bot.recoverFromDB()
                }catch(e){
                    console.log(e)
                }
            }
        })
    }

    listen(){
        this.server.listen(this.port,()=>{
            console.log(`Listening on http://localhost:${this.port}`)
        })
    }
}