const serviciosModel = (sequelize, DataType) => {
    const Servicios = sequelize.define("servicios", {
        servicio_id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        nombre: {
            type: DataType.STRING
        },
        descripcion: {
            type: DataType.STRING
        },
        precio: {
            type: DataType.INTEGER
        }
    });

    console.log('Servicios')
    return Servicios;
};

export default serviciosModel