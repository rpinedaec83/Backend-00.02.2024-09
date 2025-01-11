const mascotasModel = (sequelize, DataType) => {
    const Mascotas = sequelize.define("mascotas", {
        mascota_id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        nombre: {
            type: DataType.STRING
        },
        raza: {
            type: DataType.STRING
        },
        color: {
            type: DataType.STRING
        },
        edad: {
            type: DataType.INTEGER
        },
        tipo: {
            type: DataType.STRING
        },
        peso: {
            type: DataType.STRING
        }
    });

    console.log('Mascotas')
    return Mascotas;
};

export default mascotasModel