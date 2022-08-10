import db from "../postgresStrategy/db.js";

async function selectSessions(queryComplement, querySupplies) {
    return db.query(`
        SELECT *
        FROM sessions
        ${queryComplement}
    `, querySupplies);
}

export const sessionPatterns = {
    selectSessions,
};