import express from "express";
import * as controller from "../controllers/contrato";
import validateJWT from "../middleware/validateJWT";
import checkLastLogin from "../middleware/checkLastLogin";
import checkUserEnabled from "../middleware/checkUserEnabled";

const router = express.Router();

router.post("/", validateJWT, checkLastLogin, checkUserEnabled, controller.create);
router.get("/", validateJWT, checkLastLogin, checkUserEnabled, controller.list);
router.get("/:id", validateJWT, checkLastLogin, checkUserEnabled, controller.getById);
router.put("/:id", validateJWT, checkLastLogin, checkUserEnabled, controller.update);
router.get("/:idCliente/:idContrato", validateJWT, checkLastLogin, checkUserEnabled, controller.geraContrato);
router.delete("/:idContrato", validateJWT, checkLastLogin, checkUserEnabled, controller.deleteOne);

export default router;

