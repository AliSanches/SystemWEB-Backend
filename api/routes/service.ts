import express from "express";
import * as controller from "../controllers/service";
import validateJWT from "../middleware/validateJWT";
import checkLastLogin from "../middleware/checkLastLogin";
import checkUserEnabled from "../middleware/checkUserEnabled";
import * as validate from "../validators/service/validator";

const router = express.Router();

router.post("/", validateJWT, checkUserEnabled, checkLastLogin, validate.create, controller.create);
router.get("/:all?", validateJWT, checkUserEnabled, checkLastLogin, controller.list);
router.put("/", validateJWT, checkUserEnabled, checkLastLogin, validate.update, controller.update);
router.delete("/:id", validateJWT, checkUserEnabled, checkLastLogin, controller.remove);

export default router;
