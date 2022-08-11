import pg from 'pg';

const { Pool } = pg;

const databaseConfig = {
    //connectionString: process.env.DATABASE_URL,
    user: "postgres",
    password: "12345678J" ,
    host: "localhost",
    port: "5432",
    database: "projetolinkr",
    ssl: {
        rejectUnauthorized: false
    }
}


const db = new Pool(databaseConfig);

export default db;