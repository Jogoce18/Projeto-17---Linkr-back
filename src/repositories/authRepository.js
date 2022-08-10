import connection from "../postgresStrategy/database.js"

async function getUser(email){
    return connection.query(`SELECT * FROM users  WHERE email=$1` , [email])
}

async function postSignUp(email,password,username,pictureUrl){
    return connection.query(`INSERT INTO users (email,password,username,"pictureUrl") VALUES ($1,$2,$3,$4)` , [email,password,username,pictureUrl])
}
async function postLogin(userId,token){
    return connection.query(`INSERT INTO sessions ("userId",token) VALUES ($1,$2)` , [userId,token])
}

export const tokenRepository = {
    getUser,
    postSignUp,
    postLogin
}