import { Sequelize, DataTypes } from "sequelize"
import sequelize from "../../src/config/dbconfig.js"
import clientesModel from './clientes.model.js';
import mascotasModel from './mascotas.models.js';
import consultasModel from './consultas.models.js';
import serviciosModel from './servicios.models.js';

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Clientes = clientesModel(sequelize, DataTypes)
db.Mascotas = mascotasModel(sequelize, DataTypes)
db.Consultas = consultasModel(sequelize, DataTypes)
db.Servicios = serviciosModel(sequelize, DataTypes)

db.Clientes.hasMany(db.Consultas,{
    foreignKey : "clientes_dni",
    sourceKey : "dni"
})

db.Consultas.belongsTo(db.Clientes,{
    foreignKey : "clientes_dni",
    targetKey : "dni"
})

db.Mascotas.hasMany(db.Consultas,{
    foreignKey : "mascotas_id",
    sourceKey : "mascota_id"
})

db.Consultas.belongsTo(db.Mascotas,{
    foreignKey : "mascotas_id",
    targetKey : "mascota_id"
})

db.Servicios.hasMany(db.Consultas,{
    foreignKey : "servicios_id",
    sourceKey : "servicio_id"
})

db.Consultas.belongsToMany(db.Servicios,{
    through : "consultas_servicios",
    sourceKey : "consulta_id",
    targetKey : "servicio_id"
})

export default db;