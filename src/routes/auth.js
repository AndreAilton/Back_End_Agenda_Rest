import express from "express";
import RegisterController from "../controllers/RegisterController.js";
import LoginController from "../controllers/LoginController.js";
import ValidateRegister from "../middlewares/ValidateRegister.js";

const router = express.Router();


router.post("/register", ValidateRegister.validate(), RegisterController.register);
router.post("/login", LoginController.login);
router.post("/logout", LoginController.logout);

export default router;