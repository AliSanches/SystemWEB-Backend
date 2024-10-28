import express from "express";
import * as controller from "../controllers/messages";
import validateJWT from "../middleware/validateJWT";
import checkUserEnabled from "../middleware/checkUserEnabled";

const router = express.Router();

router.get("/contacts/:userId", validateJWT, checkUserEnabled, controller.getContacts);
router.get("/chat/:userId/:contactId", validateJWT, checkUserEnabled, controller.getChat);
router.post("/chat/:userId/:contactId", validateJWT, checkUserEnabled, controller.sendMessage);
router.get("/notifications", validateJWT, checkUserEnabled, controller.getNotifications);
router.get("/get-not-added/:userId", validateJWT, checkUserEnabled, controller.getNotAdded);
router.post("/add-contact", validateJWT, checkUserEnabled, controller.addContact);
router.put("/remove-contact", validateJWT, checkUserEnabled, controller.removeContact);

export default router;

