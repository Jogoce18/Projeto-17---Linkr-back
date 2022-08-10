import pg from 'pg';

const { Pool } = pg;

//const databaseConfig = {
  //  connectionString: process.env.DATABASE_URL,
    //ssl: {
      //  rejectUnauthorized: false
    //}
//}

const databaseConfig={
    user:"postgres",
    host:"localhost",
    database:"teste",
    password:"keening123",
    port:5432
}

const db = new Pool(databaseConfig);

export default db;