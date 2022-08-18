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
	users."pictureURL",
	COALESCE((
        SELECT 
            json_agg(json_build_object('postId', likes."postId", 'username', users.username, 'userId', likes."userId"))
        FROM likes
        JOIN users
        ON users.id=likes."userId"
        WHERE likes."postId" = posts.id), '[]') as "likes"
    FROM posts 
    JOIN users 
    ON posts."userId" = users.id
    WHERE users.id = $1
    ORDER BY posts.id DESC
    `, [userId]);
}

async function searchUsersBasedOnNameAndOrderedByFollowingState(id , name) {
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
    searchUsersBasedOnNameAndOrderedByFollowingState,
}