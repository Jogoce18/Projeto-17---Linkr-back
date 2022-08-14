<<<<<<< HEAD
import pg from 'pg';
import dotenv from "dotenv";
=======
import pg from "pg";
>>>>>>> 8de3f4c4c381de8252b9cb66877ec440572e16bf

const { Pool } = pg;
dotenv.config()

const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
  //user: "postgres",
  //password: "" ,
  //host: "localhost",
  //port: "5432",
  //database: "",
  ssl: {
    rejectUnauthorized: false,
  },
};

const db = new Pool(databaseConfig);

export default db;
