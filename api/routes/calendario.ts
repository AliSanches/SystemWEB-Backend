import express from "express";
import * as controller from "../controllers/calendario";
import validateJWT from "../middleware/validateJWT";
import checkUserEnabled from "../middleware/checkUserEnabled";
import checkLastLogin from "../middleware/checkLastLogin";
import * as validate from "../validators/calendario/validator";

const router = express.Router();

router.post("/tarefa", validateJWT, checkUserEnabled, checkLastLogin, validate.criarTarefa, controller.criarTarefa);
router.put("/tarefa", validateJWT, checkUserEnabled, checkLastLogin, validate.editarTarefa, controller.editarTarefa);
router.get(
    "/listar-por-data",
    validateJWT,
    checkUserEnabled,
    checkLastLogin,
    validate.buscarPorData,
    controller.listarPorData
);
router.delete(
    "/tarefa/:id",
    validateJWT,
    checkUserEnabled,
    checkLastLogin,
    validate.deletarTarefa,
    controller.deletarTarefa
);
router.get("/google-login/:userId", controller.googleLogin);
router.get("/google-success", controller.googleSuccess);
router.post("/create", validateJWT, checkUserEnabled, checkLastLogin, controller.createGoogleTask);

export default router;

