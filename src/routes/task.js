import express from "express";
import CreateTaskController from "../controllers/createtask.js";
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();


router.post("/",authMiddleware, CreateTaskController.create);//Criar
router.get("/", authMiddleware, CreateTaskController.getAll);// Resgatar
router.put("/:id", authMiddleware, CreateTaskController.update);//Editar
router.delete("/:id", authMiddleware, CreateTaskController.delete);//Deletar

export default router;