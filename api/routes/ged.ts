import express from "express";
import * as controller from "../controllers/ged";
import validateJWT from "../middleware/validateJWT";
import checkLastLogin from "../middleware/checkLastLogin";
import checkUserEnabled from "../middleware/checkUserEnabled";
import checkAvailableSpace from "../middleware/checkAvailableSpace";

const multer = require("multer");
const upload = multer({ dest: "uploadsGed/" });
const router = express.Router();

router.post("/create/pasta", validateJWT, checkUserEnabled, checkLastLogin, controller.createPasta);
router.get("/get/pasta", validateJWT, checkUserEnabled, checkLastLogin, controller.getPasta);
router.get("/get", validateJWT, checkUserEnabled, checkLastLogin, checkAvailableSpace, controller.get);
router.get("/get/:id", validateJWT, checkUserEnabled, checkLastLogin, checkAvailableSpace, controller.getAnexoPorId);
router.delete("/delete/:id", checkAvailableSpace, controller.deleteFolder);
router.post(
    "/file",
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

