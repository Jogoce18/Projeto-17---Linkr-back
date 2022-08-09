import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

 const server = express();

 server.use(cors());
 server.use(express.json());


const PORT = process.env.PORT || 4000; 
server.listen(POST, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});