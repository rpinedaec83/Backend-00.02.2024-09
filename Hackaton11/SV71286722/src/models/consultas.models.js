const consultasModel = (sequelize, DataType) => {
    const Consultas = sequelize.define("consultas", {
        consulta_id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true

        }
    });

    console.log('Consultas')
    return Consultas;
};

export default consultasModel