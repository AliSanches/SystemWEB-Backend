import express from "express";
import * as controller from "../controllers/process";
import validateJWT from "../middleware/validateJWT";
import checkLastLogin from "../middleware/checkLastLogin";
import checkUserEnabled from "../middleware/checkUserEnabled";
import * as validate from "../validators/process/validator";

const router = express.Router();

router.post("/", validateJWT, checkUserEnabled, checkLastLogin, validate.create, controller.create);
router.get("/:customerId/list", validateJWT, checkUserEnabled, checkLastLogin, controller.list);
router.get("/:processId", validateJWT, checkUserEnabled, checkLastLogin, controller.get);
router.put("/:processId", validateJWT, checkUserEnabled, checkLastLogin, controller.update);
router.put("/:processId/finish", validateJWT, checkUserEnabled, checkLastLogin, validate.finish, controller.finish);
router.put("/:processId/reopen", validateJWT, checkUserEnabled, checkLastLogin, validate.reopen, controller.reopen);
router.delete("/:id", validateJWT, checkUserEnabled, checkLastLogin, controller.remove);

export default router;