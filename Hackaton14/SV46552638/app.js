require('dotenv').config();
const express = require ('express');
const app = express();
const path = require('path');
const socket = require("socket.io");

const PORT = process.env.PORT || 8000;

//conexion a la base de datos
require("./database/connection");

app.use(express.json());
app.get('/', (req, res)=>{
    res.render('index')
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));

const server = require('http').createServer(app);
const io = socket(server);
require('./socket')(io);

server.listen(PORT,()=>{
    console.log("puerto 3000");
})