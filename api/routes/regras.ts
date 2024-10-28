import express from "express";
import * as controller from "../controllers/regras";
import validateJWT from "../middleware/validateJWT";
import checkLastLogin from "../middleware/checkLastLogin";
import checkUserEnabled from "../middleware/checkUserEnabled";

const router = express.Router();

router.get("/pedagio/:customerId", validateJWT, checkUserEnabled, checkLastLogin, controller.pedagio);
router.get("/transicao-50/:customerId", validateJWT, checkUserEnabled, checkLastLogin, controller.transicao50);
router.get("/transicao-100/:customerId", validateJWT, checkUserEnabled, checkLastLogin, controller.transicao100);
router.get("/transicao-100-professor/:customerId", controller.transicao100Professor);
router.get("/regra-pontos/:customerId", controller.regraPontos);
router.get(
    "/idade-progressiva/:customerId",
    validateJWT,
    checkUserEnabled,
    checkLastLogin,
    controller.idadeProgressiva
);
router.get("/transicao-especial/:customerId", controller.transicaoEspecial);

export default router;

