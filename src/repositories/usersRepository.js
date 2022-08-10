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

export const userPatterns = {
    searchUsers,
}