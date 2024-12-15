import express from "express";
import RegisterController from "../controllers/RegisterController.js";
import LoginController from "../controllers/LoginController.js";
import ValidateRegister from "../middlewares/ValidateRegister.js";
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post("/register", ValidateRegister.validate(), RegisterController.register);
router.post("/login", LoginController.login);
router.post("/logout", LoginController.logout);
router.get('/autenticado', authMiddleware )
export default router;