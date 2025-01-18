const express = require('express');
const cookieSession = require('cookie-session');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(
    cookieSession({
        name: "auth-session",
        keys:[process.env.COOCKIE_SECRET],
        httpOnly:true
    })
);

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

app.get('/', (req,res)=>{
    res.send("Hola");
})



const db = require('./app/models');
const Role = db.role;
db.mongoose.connect(process.env.mongoURI,{}).then(()=>{
    console.log("Esta conectado");
    init();
}).catch((error)=>{
    console.error(error);
    process.exit();
})

function init(){
    Role.estimatedDocumentCount((err,count)=>{
        if(!err & count === 0){
            new Role({
                name:"user"
            }).save((error)=>{
                if(error){
                    console.log("Errorl al crear el Role user")
                }
                console.log("Rol user creado")
            })
            new Role({
                name:"moderator"
            }).save((error)=>{
                if(error){
                    console.log("Error al crear el Role moderator")
                }
                console.log("Rol moderator creado")
            })
            new Role({
                name:"admin"
            }).save((error)=>{
                if(error){
                    console.log("Error al crear el Role admin")
                }
                console.log("Rol admin creado")
            })
        }
    })
}

app.listen(PORT,()=>{
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})
