import db from "../postgresStrategy/db.js"

async function getUser(email){
    return db.query(`SELECT * FROM users  WHERE email=$1` , [email])
}

async function postSignUp(email,password,username,pictureURL){
    return db.query(`INSERT INTO users (email,password,username,"pictureURL") VALUES ($1,$2,$3,$4)` , [email,password,username,pictureURL])
}

async function postLogin(token){
    return db.query(`INSERT INTO sessions (token) VALUES ($1)` , [token])
}

export const authRepository = {
    getUser,
    postSignUp,
    postLogin
}