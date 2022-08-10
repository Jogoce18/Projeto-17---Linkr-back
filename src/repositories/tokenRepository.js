import db from "../postgresStrategy/db.js"

async function getToken(token){
    return db.query(`SELECT * FROM sessions  WHERE token=$1` , [token])
}

async function getUser(session){
    return db.query(`SELECT * FROM users  WHERE id=$1` , [session])
}

export const tokenRepository = {
	getToken,
    getUser,
}