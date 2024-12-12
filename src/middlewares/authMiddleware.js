// src/middlewares/authMiddleware.js

import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adiciona os dados do usuário decodificados no objeto `req` para uso nas rotas
    req.user = decoded;
    
    next(); // Continua para o próximo middleware ou controlador
  } catch (error) {
    res.status(400).json({ message: 'Token inválido ou expirado.' });
  }
};

export default authMiddleware;
