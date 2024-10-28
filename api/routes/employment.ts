import express from "express";
import * as controller from "../controllers/employment";
import validateJWT from "../middleware/validateJWT";
import checkLastLogin from "../middleware/checkLastLogin";
import checkUserEnabled from "../middleware/checkUserEnabled";
import * as validate from "../validators/employment/validator";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/get/:id", validateJWT, checkUserEnabled, checkLastLogin, validate.get, controller.get);
router.get("/list/:customerId", validateJWT, checkUserEnabled, checkLastLogin, validate.list, controller.list);
router.post("/create", validateJWT, checkUserEnabled, checkLastLogin, validate.create, controller.create);
router.put("/update", validateJWT, checkUserEnabled, checkLastLogin, validate.update, controller.update);
router.delete("/delete/:id", validateJWT, checkUserEnabled, checkLastLogin, validate.remove, controller.remove);
router.post("/upload/:customerId", upload.single("cnis"), controller.uploadCnis);

export default router;

