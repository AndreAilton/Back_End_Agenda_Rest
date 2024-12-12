
import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rota protegida que só pode ser acessada por usuários autenticados
router.get('/privado', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'Bem-vindo à área privada!',
    user: req.user, // Informações do usuário extraídas do token JWT
  });
});

export default router;
