import pg from "pg";
import dotenv from "dotenv";

const { Pool } = pg;
dotenv.config();

const databaseConfig = {
  //connectionString: process.env.DATABASE_URL,
  user: "postgres",
  password: "trajano09" ,
  host: "localhost",
  port: "5432",
  database: "Teste2",
  ssl: {
    rejectUnauthorized: false,
  },
};

const db = new Pool(databaseConfig);

export default db;
