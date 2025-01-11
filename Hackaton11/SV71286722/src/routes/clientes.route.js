import { Router } from "express"
import { addClientes, deleteCliente, getClientes, getClientesbyDNI, updateClientes } from "../controllers/clientes.controller.js"

const router = Router()

router.get("/", getClientes)
router.post("/", addClientes)
router.put("/:id", updateClientes)
router.delete("/:id", deleteCliente)
router.get("/:id", getClientesbyDNI)

export default router