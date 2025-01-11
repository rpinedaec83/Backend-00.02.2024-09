const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
app.set("port", 8089);
app.use(express.static(path.join(__dirname, "./public")));

const server = require('http').Server(app);

const webSocketServer = require("websocket").server;
const wsServer = new webSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});




function originIsAllowed(origin){
    if(origin === "http://localhost:8089"){
        return true
    }
    return false;
}


wsServer.on("request",(request)=>{
    if(!originIsAllowed(request.origin)){
        request.reject();
        console.log(new Date()+" Conexion dek origen "+request.origin+" rechazada");
        return;
    }
    const connection = request.accept(null, request.origin);
    let objMessage={};
    connection.on("message", async (message)=>{
        console.log(message.utf8Data);
        let arrInfo = message.utf8Data.split(':');
        console.log(arrInfo);
        switch (arrInfo[0]) {
            case "clima":
                const options = {
                    method: 'GET',
                    url: 'https://weatherapi230.p.rapidapi.com/current',
                    params: {
                      units: 'metric',
                      location: arrInfo[1]
                    },
                    headers: {
                      'x-rapidapi-key': '73d70d2c28msh7f79106bce6c25ep19a96ajsn943644966186',
                      'x-rapidapi-host': 'weatherapi230.p.rapidapi.com',
                      'X-API-Key': '73d70d2c28msh7f79106bce6c25ep19a96ajsn943644966186'
                    }
                  };
                  try {
                    const response = await axios.request(options);
                    console.log(response.data);
                    objMessage.type = "clima";
                    objMessage.content = response.data
                    connection.sendUTF(JSON.stringify(objMessage));
                } catch (error) {
                    console.error(error);
                }
                break;
        
            default:
                objMessage.type = "default";
                objMessage.content = message.utf8Data
                connection.sendUTF(JSON.stringify(objMessage));
                break;
        }

        
    })
})

server.listen(app.get("port"), ()=>{
    console.log("Servidor iniciado en el puerto "+ app.get("port"));
})