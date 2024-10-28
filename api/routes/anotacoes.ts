import express from "express";
import * as controller from "../controllers/anotacoes";
import validateJWT from "../middleware/validateJWT";
import checkLastLogin from "../middleware/checkLastLogin";
import checkUserEnabled from "../middleware/checkUserEnabled";
import * as validate from "../validators/anotacoes";

const router = express.Router();

router.get("/lista-anotacoes", validateJWT, checkUserEnabled, checkLastLogin, controller.listaAnotacoes);
router.get("/get-anotacao/:id", validateJWT, checkUserEnabled, checkLastLogin, controller.getAnotacao);
router.get("/categoria", validateJWT, checkUserEnabled, checkLastLogin, controller.listCategoria);
router.get("/categoria/subcategoria", validateJWT, checkUserEnabled, checkLastLogin, controller.listSubcategoriasAll);
router.get("/categoria/:id", validateJWT, checkUserEnabled, checkLastLogin, controller.getSubcategoriaPorCategoria);
router.get("/categoria/subcategoria/:id", validateJWT, checkUserEnabled, checkLastLogin, controller.listSubcategoriaId);
router.get(
    "/categoria/subcategoria/anotacao/:id",
    validateJWT,
    checkUserEnabled,
    checkLastLogin,
    controller.listQtdAnotacaoPorSubcategoria
);
router.put("/anotacao/:id", validateJWT, checkUserEnabled, checkLastLogin, validate.update, controller.updateAnotacao);
router.put("/categoria/subcategoria/:id", validateJWT, checkUserEnabled, checkLastLogin, controller.updateSubcategoria);
router.put("/categoria/:id", validateJWT, checkUserEnabled, checkLastLogin, controller.updateCategoria);
router.post("/anotacao", validateJWT, checkUserEnabled, checkLastLogin, controller.createAnotacao);
router.post("/categoria", validateJWT, checkUserEnabled, checkLastLogin, controller.createCategoria);
router.post("/categoria/subcategoria", validateJWT, checkUserEnabled, checkLastLogin, controller.createSubcategoria);
router.delete("/:id", validateJWT, checkUserEnabled, checkLastLogin, controller.deleteAnotacao);
router.delete("/categoria/:id", validateJWT, checkUserEnabled, checkLastLogin, controller.deleteCategoria);
router.delete(
    "/categoria/subcategoria/:id",
    validateJWT,
    checkUserEnabled,
    checkLastLogin,
    controller.deleteSubcategoria
);

export default router;

