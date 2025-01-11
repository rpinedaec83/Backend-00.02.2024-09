import "dotenv/config"

import db from "./models/index.js"
import { Server } from "./server/server.js"


const server = new Server();

const start = async () => {
    try{
        await db.sequelize.sync( {force:true} )
        console.log('OK')
    }catch(e){
        console.error('BAD')
    }
}

start()
server.listen()