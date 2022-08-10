import connection from "../database.js";

function searchUsers(queryComplement, querySupplies) {
    return connection.query(`
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