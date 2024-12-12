

**Agenda API com Autenticação**
==========================

**Resumo**
--------

Esta API foi desenvolvida com o objetivo de criar um sistema de gerenciamento de agendas com autenticação de usuários. A API foi construída utilizando as melhores práticas de desenvolvimento de software e segue os padrões de segurança e escalabilidade.

**Dependências**
------------

*   **Node.js**: Versão 14.x ou superior
*   **Express.js**: Versão 4.x ou superior
*   **MongoDB**: Versão 3.x ou superior
*   **Mongoose**: Versão 5.x ou superior
*   **bcrypt**: Versão 5.x ou superior
*   **jsonwebtoken**: Versão 8.x ou superior
*   **dotenv**: Versão 8.x ou superior

**Estrutura do Projeto**
----------------------

O projeto foi estruturado da seguinte forma:

*   **app.js**: Arquivo principal da aplicação, responsável por inicializar o servidor e configurar as rotas.
*   **config**: Pasta contendo os arquivos de configuração da aplicação, incluindo o arquivo de variáveis de ambiente (.env).
*   **controllers**: Pasta contendo os controladores da aplicação, responsáveis por lidar com as requisições e respostas.
*   **models**: Pasta contendo os modelos da aplicação, responsáveis por interagir com o banco de dados.
*   **routes**: Pasta contendo as rotas da aplicação, responsáveis por mapear as URLs para os controladores.
*   **services**: Pasta contendo os serviços da aplicação, responsáveis por realizar operações de negócios.
*   **utils**: Pasta contendo funções utilitárias da aplicação.

**Boas Práticas**
----------------

*   **Separação de Concerns**: A aplicação foi dividida em camadas, cada uma com sua responsabilidade específica.
*   **Injeção de Dependências**: As dependências foram injetadas nos controladores e serviços, permitindo uma maior flexibilidade e testabilidade.
*   **Uso de Middleware**: Middleware foi utilizado para realizar operações de autenticação e autorização.
*   **Uso de Tokens**: Tokens foram utilizados para autenticar e autorizar os usuários.
*   **Uso de Hash**: Hash foi utilizado para armazenar as senhas dos usuários de forma segura.
*   **Uso de Environment Variables**: Variáveis de ambiente foram utilizadas para armazenar as configurações da aplicação.

**Códigos**
---------

### app.js
```javascript
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.PORT}`);
});
```

### controllers/auth.js


Aqui está o código refatorado para utilizar o padrão ES6:

**app.js**
```javascript
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes'));

app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado na porta ${process.env.PORT}`);
});
```

**controllers/auth.js**
```javascript
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'Usuário não encontrado' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: 'Senha inválida' });
  }

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

  return res.json({ token });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: 'Usuário já cadastrado' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashedPassword });

  return res.json({ message: 'Usuário cadastrado com sucesso' });
};
```

**models/User.js**
```javascript
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

export default User;
```

**routes/auth.js**
```javascript
import express from 'express';
import router from express.Router();
import authController from '../controllers/auth';

router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;
```

**routes/index.js**
```javascript
import express from 'express';
import router from express.Router();
import authRouter from './auth';

router.use('/auth', authRouter);

export default router;
```

**.env**
```makefile
MONGO_URI=mongodb://localhost:27017/agenda
SECRET_KEY=seu_secret_key_aqui
PORT=3000
```

Lembre-se de criar um arquivo `.env` com as variáveis de ambiente necessárias para o seu projeto. Além disso, certifique-se de instalar as dependências necessárias com o comando `npm install` ou `yarn install`.