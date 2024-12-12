// src/controllers/LoginController.js

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';  // Modelo de Usuário

class LoginController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // 1. Verifica se o usuário existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado' });
      }

      // 2. Compara a senha fornecida com a senha armazenada (criptografada)
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Senha incorreta' });
      }

      // 3. Gera um JWT (token)
      const token = jwt.sign(
        { id: user._id, email: user.email },  // Dados que queremos incluir no token
        process.env.JWT_SECRET       
      );

      // 4. Retorna o token para o usuário
      res.cookie('token', token, {
        httpOnly: true,       // Não acessível via JavaScript
        secure: process.env.NODE_ENV === 'production', // Somente HTTPS em produção
        sameSite: 'Strict',   // Proteção contra CSRF
        maxAge: 3600000,      // 1 hora em milissegundos
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao tentar autenticar o usuário' });
    }

      res.status(200).json({ message: 'Login bem-sucedido!' });
  }

  static logout(req, res) {
    res.clearCookie('token'); // Remove o cookie
    res.status(200).json({ message: 'Logout bem-sucedido!' });
  }
}

export default LoginController;
