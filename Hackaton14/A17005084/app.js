import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

import express from "express";
import { Server } from "socket.io";
import OpenAI from 'openai';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { timeStamp } from "node:console";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const server = createServer(app);

const io = new Server(server);

mongoose.connect(process.env.MONGOBD,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('Conectado a base de datos')
}).catch((err)=>{
    console.error('Error al conectar a BD',err);
});

const messageData=new mongoose.Schema({
    username:String,
    mensaje:String,
    timeStamp:{type:Date,default:Date.now},
});


const Message=mongoose.model('tbchats',messageData);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });


io.on("connection", (socket) => {
  console.log("a user connected");
  // escuchar cuando se desconecte un usuario
  
  const HistoriChat=[];

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  //escuchar mensajes
  socket.on("chat message", async (data) => {
    try {
        HistoriChat.push({role:"user",content:data.message});
        const ChatUsuario=new Message({username:data.username,mensaje:data.message})
        await ChatUsuario.save();
        
        console.log("🚀 ~ file: app.js:25 ~ socket.on ~ data:", data);
         //guardado de mensajes en la base de datos
        const response=await openai.chat.completions.create({
            model:process.env.MODEL ||"gpt-3.5-turbo",
            //messages:HistoriChat,
            messages:[{role:"user",content:data.message}],
        })
        const respuesta=response.choices[0].message?.content;
        HistoriChat.push({role:"GPT",content:respuesta});
        const DatChat=new Message({username:"GPT",mensaje:respuesta})
        await DatChat.save();
        console.log('Respuesta guardada en la BD:', DatChat);
        //peticion http a open IA
        socket.emit("response message", { username: "GPT", message: respuesta});
    } catch (error) {
        socket.emit("response message", { username: "GPT", message: error.message });
    }    
  });
});

app.use('/style', express.static(join(__dirname, 'style')));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

server.listen(3000, () => {
  console.log(`server running on port ${3000}`);
});