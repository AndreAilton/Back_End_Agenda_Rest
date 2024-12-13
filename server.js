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

app.use(cors());
app.use(express.json());
app.use(cookieParser()); 
app.use(router);



app.listen(PORT, () => {
    console.log(`Servidor Rodando na porta ${PORT}`);
});