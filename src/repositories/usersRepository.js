import db from "../postgresStrategy/db.js";

function searchUsers(queryComplement, querySupplies) {
    return db.query(`
        SELECT 
            users.picture as picture,
            users.name as name
        FROM users
        ${queryComplement}
    `, querySupplies);
}

async function selectUserById(id) {
    return await db.query(
    `--sql
    SELECT * 
    FROM users
    WHERE id = $1
    `, [id]);
}

export const userPatterns = {
    searchUsers,
    selectUserById,
}