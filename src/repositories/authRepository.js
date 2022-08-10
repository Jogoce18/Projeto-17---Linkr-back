import db from "../postgresStrategy/db.js"

async function getUser(email){
    return db.query(`SELECT * FROM users  WHERE email=$1` , [email])
}

async function postSignUp(email,password,username,pictureUrl){
    return db.query(`INSERT INTO users (email,password,name,"pictureUrl") VALUES ($1,$2,$3,$4)` , [email,password,username,pictureUrl])
}

async function postLogin(userId,token){
    return db.query(`INSERT INTO sessions ("userId",token) VALUES ($1,$2)` , [userId,token])
}

export const authRepository = {
    getUser,
    postSignUp,
    postLogin
}