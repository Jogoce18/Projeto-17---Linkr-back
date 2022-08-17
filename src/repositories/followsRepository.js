import db from "../postgresStrategy/db.js";

async function selectFollowByIds(userId, followerId) {
    return db.query(`
        SELECT * 
        FROM followers
        WHERE 
            "userId" = $1 AND
            "followerId" = $2
    `, [userId, followerId]);
}

async function deleteFollow(userId, followerId) {
    return db.query(`
        DELETE 
        FROM followers
        WHERE 
            "userId" = $1 AND
            "followerId" = $2
    `, [userId, followerId]);
}

async function insertFollow(userId, followerId) {
    return db.query(`
        INSERT INTO followers 
        ("userId", "followerId")
        VALUES ($1, $2)
    `, [userId, followerId]);
}

export const followerRepository = {
    selectFollowByIds,
    deleteFollow,
    insertFollow,
}