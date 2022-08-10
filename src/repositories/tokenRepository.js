import connection from "../postgresStrategy/database.js"

async function getToken(token){
    return connection.query(`SELECT * FROM sessions  WHERE token=$1` , [token])
}

async function getUser(session){
    return connection.query(`SELECT * FROM users  WHERE id=$1` , [session])
}

export const tokenRepository = {
	getToken,
    getUser,
}