import express from "express";
import * as controller from "../controllers/configs";
import validateJWT from "../middleware/validateJWT";
import checkLastLogin from "../middleware/checkLastLogin";
import checkUserEnabled from "../middleware/checkUserEnabled";

const router = express.Router();

router.put("/", validateJWT, checkLastLogin, checkUserEnabled, controller.update);
router.get("/", validateJWT, checkLastLogin, checkUserEnabled, controller.get);

export default router;

