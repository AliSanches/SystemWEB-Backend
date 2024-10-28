import express from "express";
import * as controller from "../controllers/relatorios";
import validateJWT from "../middleware/validateJWT";
import checkUserEnabled from "../middleware/checkUserEnabled";

const router = express.Router();

router.get("/dashboard", validateJWT, checkUserEnabled, controller.dashboard);
router.get("/:idRelatorio", controller.listagemClientes);

export default router;

