
import { body, validationResult } from 'express-validator';

class ValidateRegister {
  static validate() {
    return [
      // Valida o campo name
      body('name')
        .notEmpty().withMessage('O nome é obrigatório')
        .isLength({ min: 3 }).withMessage('O nome deve ter no mínimo 3 caracteres'),

      // Valida o campo email
      body('email')
        .notEmpty().withMessage('O email é obrigatório')
        .isEmail().withMessage('Email inválido')
        ,

      // Valida o campo password
      body('password')
        .notEmpty().withMessage('A senha é obrigatória')
        .isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres')
        .matches(/[0-9]/).withMessage('A senha deve conter ao menos um número')
        .matches(/[a-zA-Z]/).withMessage('A senha deve conter ao menos uma letra'),

      // Middleware para verificar se há erros
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      },
    ];
  }
}

export default ValidateRegister;
