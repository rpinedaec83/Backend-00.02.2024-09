import "dotenv/config";
import express from "express";
import cors from "cors";
import sequelize from "./config/db/sequelize.config.js";
import Clientes from "../src/models/clients.model.js";
import Mascotas from "./models/mascota.model.js";
import Servicios from "./models/servicios.model.js";
import persveterinario from "./models/persveterinario.model.js";
import consultas from "./models/consulta.model.js";
const app = express();
const port = 3000;
 
app.use(cors());
app.use(express.json());
 
try {
  sequelize.authenticate().catch((err) => {
    console.error(err);
  });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
app.post("/consultas",async(req,resp)=>{
  try {
    const { DtMascota, ...rest } = req.body;

    const VeriMascota = await Mascotas.findByPk(DtMascota);
    if (!VeriMascota) {
      return resp
        .status(400)
        .json({ message: "Codigo de  mascota no existe" });
    }

    const newConsultas = await consultas.create({
      ...rest,
      IdMascota: VeriMascota.codigo,
    });

    return resp.json({message:"Consulta generada correctamente",data:newConsultas});
  } catch (error) {
    console.log("🚀 ~ file: app.js:36 ~ app.post ~ err:", error);
    return resp.status(500).json({ message: "error del servidor" });
  }
})
app.post("/persveterinario",async(req,resp)=>{
  try {
    const VeriDoc=await persveterinario.findByPk(req.body.NroDocuIden)
    if (VeriDoc) {
      return resp.status(400).json({message:"Documento ya existe"});
    }
    const newPersonal=await persveterinario.create(req.body);
    return resp.json({message:"Personal veterinario creado",data:newPersonal});
  } catch (error) {
    console.log("🚀 ~ file: app.js:36 ~ app.post ~ err:", error);
    return resp.status(500).json({ message: "error del servidor" });
  }
})

app.get("/persveterinario", async (req, resp) => {
  const LstPersVeterinario = await persveterinario.findAll({
    attributes: ["IdPersVete", "NroDocuIden", "NroLicencia","NomPersVeter","ApePersVeter", "FecIngreso", "Sueldo","Especialidad"],
  });
 
  return resp.json({ message: "Datos de personal veterinario", data: LstPersVeterinario });
});

app.patch("/persveterinario/:IdPersVete", async (req, resp) => {
  try {
    const { IdPersVete } = req.params;
 
    const updataData = await persveterinario.update(
      {
        ...req.body,
      },
      {
        where: {
          IdPersVete,
        },
        returning: true,
      }
    );
 
    if (updataData.length > 0) {
      console.log(updataData[1][0]);
      return resp.json({
        message: "datos actualizados",
        data: updataData[1][0].dataValues,
      });
    }
    resp.json({});
  } catch (err) {
    console.log("🚀 ~ file: app.js:36 ~ app.post ~ err:", err);
    return resp.status(500).json({ message: "error del servidor" });
  }
});

app.delete("/persveterinario/:IdPersVete", async (req, resp) => {
  const { IdPersVete } = req.params;
  console.log(IdPersVete)
  const delPersVeter = await persveterinario.destroy({
    where: {
      IdPersVete: IdPersVete
    },
    force: true,
  });
 
  return resp.json({message:"Personal de veterinaria datos eliminados"});
});

app.post("/servicios",async(req,resp)=>{
  try {
    const existsServicio = await Servicios.findByPk(req.body.NomServicio);
    if (existsServicio) {
      return resp.status(400).json({ message: "El servicio ya existe" });
    }
    const newServicio = await Servicios.create(req.body);
    return resp.json({ message: "Servicio creado", data: newServicio });

  } catch (error) {
    console.log("🚀 ~ file: app.js:36 ~ app.post ~ err:", error);
    return resp.status(500).json({ message: "error del servidor" });
  }
}) 

app.get("/servicios", async (req, resp) => {
  const serviciosAten = await Servicios.findAll({
    attributes: ["IdServicio", "NomServicio", "DescServicio","PrecioServicio"],
  });
 
  return resp.json({ message: "datos de servicios", data: serviciosAten });
});
 
app.delete("/servicios/:IdServicio", async (req, resp) => {
  const { IdServicio } = req.params;
  console.log(IdServicio)
  const deleteServicio = await Servicios.destroy({
    where: {
      IdServicio: IdServicio
    },
    force: true,
  });
 
  return resp.json({message:"Servicio eliminado de los datos"});
});

app.patch("/servicios/:IdServicio", async (req, resp) => {
  try {
    const { IdServicio } = req.params;
 
    const updataData = await Servicios.update(
      {
        ...req.body,
      },
      {
        where: {
          IdServicio,
        },
        returning: true,
      }
    );
 
    if (updataData.length > 0) {
      console.log(updataData[1][0]);
      return resp.json({
        message: "datos actualizados",
        data: updataData[1][0].dataValues,
      });
    }
    resp.json({});
  } catch (err) {
    console.log("🚀 ~ file: app.js:36 ~ app.post ~ err:", err);
    return resp.status(500).json({ message: "error del servidor" });
  }
});

app.post("/clientes", async (req, resp) => {
  try {
    console.log(req.body);
 
    const existsClient = await Clientes.findByPk(req.body.dni);
 
    if (existsClient) {
      return resp.status(400).json({ message: "El cliente ya existe" });
    }
    const newClients = await Clientes.create(req.body);
 
    // console.log(newClients);
 
    return resp.json({ message: "cliente creado", data: newClients });
  } catch (err) {
    // if (
    //   err.name == "SequelizeUniqueConstraintError" &&
    //   err.error[0].path == "dni"
    // ) {
    //   resp.status(400).json({ message: "El cliente ya existe" });
    // }
    console.log("🚀 ~ file: app.js:36 ~ app.post ~ err:", err);
    return resp.status(500).json({ message: "error del servidor" });
  }
});
 
app.post("/mascotas", async (req, resp) => {
  try {
    const { responsable, ...rest } = req.body;
 
    const existResponsable = await Clientes.findByPk(responsable);
    if (!existResponsable) {
      return resp
        .status(400)
        .json({ message: "El responsable no esta registrado" });
    }
    const newMascota = await Mascotas.create({
      ...rest,
      clienteDni: existResponsable.dni,
    });
    console.log("mascotas", newMascota);
 
    return resp.json({ data: "mascota creada", data: newMascota });
  } catch (err) {
    console.log("🚀 ~ file: app.js:36 ~ app.post ~ err:", err);
    return resp.status(500).json({ message: "error del servidor" });
  }
});
 
app.get("/mascotas", async (req, resp) => {
  const mascotas = await Mascotas.findAll({
    attributes: ["codigo", "nombre", "fechaNacimiento"],
    include: [
      {
        model: Clientes,
        attributes: ["nombre", "direccion"],
      },
    ],
  });
 
  return resp.json({ message: "datos de mascotas", data: mascotas });
});
 
app.patch("/mascotas/:codigo", async (req, resp) => {
  try {
    const { codigo } = req.params;
 
    const updataData = await Mascotas.update(
      {
        ...req.body,
      },
      {
        where: {
          codigo,
        },
        returning: true,
      }
    );
 
    if (updataData.length > 0) {
      console.log(updataData[1][0]);
      return resp.json({
        message: "datos actualizados",
        data: updataData[1][0].dataValues,
      });
    }
    resp.json({});
  } catch (err) {
    console.log("🚀 ~ file: app.js:36 ~ app.post ~ err:", err);
    return resp.status(500).json({ message: "error del servidor" });
  }
});
app.delete("/mascotas/:codigo", async (req, resp) => {
  const { codigo } = req.params;
 
  const deleteMascota = await Mascotas.destroy({
    where: {
      codigo: codigo,
    },
    force: true,
  });
 
  resp.json();
});
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});