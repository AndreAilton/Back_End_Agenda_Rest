// src/controllers/RegisterController.js

import User from '../models/users.js'; // Modelo User
import bcrypt from 'bcrypt'; // Para hash da senha

class RegisterController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Verifica se o usuário já existe no banco de dados
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email já está em uso' });
      }

      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cria um novo usuário
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      // Salva o novo usuário no banco de dados
      await user.save();

      // Responde com sucesso
      res.status(201).json({
        message: 'Usuário registrado com sucesso!',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao registrar usuário' });
    }

  }
}

export default RegisterController;
