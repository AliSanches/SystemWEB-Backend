import express from "express";
import * as controller from "../controllers/note";
import validateJWT from "../middleware/validateJWT";
import checkLastLogin from "../middleware/checkLastLogin";
import checkUserEnabled from "../middleware/checkUserEnabled";
import * as validate from "../validators/note/validator";

const router = express.Router();

router.get("/list/:processId", validateJWT, checkUserEnabled, checkLastLogin, controller.getNotes);
router.post("/", validateJWT, checkUserEnabled, checkLastLogin, validate.create, controller.create);
router.put("/:noteId", validateJWT, checkUserEnabled, checkLastLogin, validate.update, controller.update);

export default router;
