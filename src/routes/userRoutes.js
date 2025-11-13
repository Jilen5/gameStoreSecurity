import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

router.get("/", UserController.listUsers);
router.get("/:id", UserController.getUser);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;
