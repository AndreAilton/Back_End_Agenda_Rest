import express from "express";
import router from "./src/routes/index.js";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import connectDB from "./src/config/dbconnect.js";
import cors from 'cors';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',   // URL do seu front-end
    credentials: true,                 // Permite cookies e credenciais
    methods: ['GET', 'POST', 'PUT', 'DELETE'] // Métodos permitidos
   
  };


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); 
app.use(router);



app.listen(PORT, () => {
    console.log(`Servidor Rodando na porta ${PORT}`);
});