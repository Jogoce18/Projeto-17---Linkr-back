import db from "../postgresStrategy/db.js";

function searchUsers(queryComplement, querySupplies) {
    return db.query(`
        SELECT 
            users.id,
            users."pictureURL",
            users."username"
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

async function selectUserPosts(userId) {
    return db.query(`
    SELECT 
        posts.id as "postId",
        posts.url,
        posts.article,
        posts."urlTitle",
        posts."urlImage",
        posts."urlDescription",
        users.id as "userId",
        users."username",
        users."pictureURL" 
    FROM posts 
    JOIN users 
    ON posts."userId" = users.id
    WHERE users.id = $1
    `, [userId]);
}

async function searchUsersBasedOnNomeAndOrderdByFollowingState(id , name) {
    return db.query(`
    SELECT 
        users.id,
        users."pictureURL",
        users."username",
        users.id IN (SELECT "userId" FROM followers WHERE "followerId" = $1) as "isFollowing"
    FROM users
    WHERE 
        LOWER(users."username") LIKE LOWER($2) || '%'
    ORDER BY "isFollowing" DESC
    `, [id, name]);
}

export const userPatterns = {
    searchUsers,
    selectUserById,
    selectUserPosts,
    searchUsersBasedOnNomeAndOrderdByFollowingState,
}