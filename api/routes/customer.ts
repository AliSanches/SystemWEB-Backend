import express from "express";
import * as controller from "../controllers/customer";
import validateJWT from "../middleware/validateJWT";
import checkLastLogin from "../middleware/checkLastLogin";
import checkUserEnabled from "../middleware/checkUserEnabled";
import * as validate from "../validators/customer/validator";
import checkAvailableSpace from "../middleware/checkAvailableSpace";

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/list", validateJWT, checkUserEnabled, checkLastLogin, validate.listing, controller.list);
router.get("/get/:id", validateJWT, checkUserEnabled, checkLastLogin, validate.get, controller.get);
router.post("/create", validateJWT, checkUserEnabled, checkLastLogin, validate.creation, controller.create);
router.put("/update", validateJWT, checkUserEnabled, checkLastLogin, validate.update, controller.update);
router.delete("/delete/:id", validateJWT, checkUserEnabled, checkLastLogin, validate.deletion, controller.remove);
router.post(
    "/:customerId/file",
    validateJWT,
    checkUserEnabled,
    checkLastLogin,
    checkAvailableSpace,
    upload.single("file"),
    controller.upload
);
router.get("/file/:fileId", controller.download);
router.delete("/file/:fileId", controller.deleteFile);
router.put("/file/:fileId", controller.renameFile);

export default router;

