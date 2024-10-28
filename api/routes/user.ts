import express from "express";
import * as controller from "../controllers/user";
import validateJWT from "../middleware/validateJWT";
import checkLastLogin from "../middleware/checkLastLogin";
import checkUserEnabled from "../middleware/checkUserEnabled";
import * as validate from "../validators/user/validator";

const router = express.Router();

router.post("/authenticate", validate.authentication, controller.authenticate);
router.post("/create", validateJWT, checkUserEnabled, checkLastLogin, validate.creation, controller.create);
router.get("/list", validateJWT, checkUserEnabled, checkLastLogin, controller.list);
router.put("/update", validateJWT, checkUserEnabled, checkLastLogin, validate.update, controller.update);
router.delete("/delete", validateJWT, checkUserEnabled, checkLastLogin, validate.deletion, controller.deleteOne);

export default router;
