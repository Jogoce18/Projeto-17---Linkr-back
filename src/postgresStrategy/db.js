import pg from "pg";
import dotenv from "dotenv";

const { Pool } = pg;
dotenv.config();

const databaseConfig = {
  /* connectionString: process.env.DATABASE_URL, */
   user: "postgres",
  password: "12345678J" ,
  host: "localhost",
  port: "5432",
  database: "linkcerto",
  ssl: {
    rejectUnauthorized: false,
  },
};

const db = new Pool(databaseConfig);

export default db;
