import { MessageModel } from "./message.model.js";
import { UserModel } from "./user.model.js";
import { ProductModel } from "./product.model.js";
import { PackageModel } from "./package.model.js";
import { sequelize as db } from "../config/dbconfig.js";

UserModel.hasMany(MessageModel, {
    foreignKey: 'userID',
})
MessageModel.belongsTo(UserModel, {
    foreignKey: 'userID',
})

UserModel.hasMany(PackageModel, {
    foreignKey: 'userID',
})
PackageModel.belongsTo(UserModel, {
    foreignKey: 'userID',
})

PackageModel.belongsToMany(ProductModel, { through: 'Orders' })
ProductModel.belongsToMany(PackageModel, { through: 'Orders' })


export { UserModel, MessageModel, ProductModel, PackageModel }

/* db.sync({ force : true }) */

/* const user = await UserModel.createUser({ nombre : 'Camilo', 
    apellido : 'Montemayor', correo: 'asd7@asd.com', contraseña:'123'}) */

/* const user = await UserModel.findByPk(10)
const created = await MessageModel.createMessage({message : 'Hola 6'})
await user.setMessages(created) */

/* const user = await UserModel.findByPk(1)
const message3 = await MessageModel.create({
    message: "Hola 3"
})

await message3.setUser(user) */

/* const result = await MessageModel.findAll({include: 'User'})
console.log(JSON.stringify(result)) */

/* console.log(MessageModel.scopeNames) */