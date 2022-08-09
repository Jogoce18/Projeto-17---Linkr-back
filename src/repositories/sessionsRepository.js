import connection from "../database.js";

async function selectSessions(queryComplement, querySupplies) {
    return connection.query(`
        SELECT *
        FROM sessions
        ${queryComplement}
    `, querySupplies);
}

export const sessionsPatterns = {
    selectSessions,
};