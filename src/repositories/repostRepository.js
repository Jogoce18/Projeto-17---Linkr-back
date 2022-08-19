import db from "../postgresStrategy/db.js";

export const insertRepost = async (userId, postId) => {
    return await db.query(
        `
        INSERT INTO reposts ("userId","postId") VALUES ($1, $2)
        
        `,
        [userId, postId],
    );
};
async function repostCount() {
    return connection.query(`
        SELECT
            r."postId",
            COUNT(r."postId") AS "repostCount"
        FROM
            reposts r
        GROUP BY
            r."postId"
    `);
}
async function deleteRepost(postId) {
    return connection.query(`
        DELETE
        FROM
            reposts
        WHERE
            "postId" = $1
    `, [postId])
}
export const userAlreadyRepostedPost = async (userId, postId) => {
    return await db.query(
        `
        SELECT * FROM reposts WHERE "userId" = $1 AND "postId" = $2
        `,
        [userId, postId],
    );
};


export const getPostsRepostsByUserIdFollows = async (userId) => {
    return await db.query(
        `--sql
    SELECT p.id, u.id AS "userId", u.username, u."pictureURL" as "pictureURL", p.article, p.url, COUNT(reposts.*) AS "repostsCount", 
    p."createdAt", false AS "isRepost", null AS "repostedBy", null AS "repostedById" 
    FROM posts p
        JOIN users u ON u.id = p."userId"
        LEFT JOIN reposts ON reposts."postId" = p.id
        WHERE u.id IN (SELECT "userId" FROM followers WHERE "followerId" = $1) OR u.id = $1
    GROUP BY p.id, reposts."postId", u.id
    UNION ALL 
        SELECT p.id, u1.id AS "userId", u1."username", u1."pictureURL", p.article, p.url, r1."repostsCount", r."createdAt",
            true AS "isRepost", u2.username AS "repostedBy", u2.id AS "repostedById"
        FROM posts p
            JOIN reposts r ON r."postId" = p.id
            JOIN (
                SELECT COUNT(reposts.id) AS "repostsCount", reposts."postId"
                FROM reposts
                JOIN posts ON reposts."postId" = posts.id
                GROUP BY posts.id, reposts."postId"
                ) r1 ON r1."postId" = p.id
            JOIN users u1 ON u1.id = p."userId"
            JOIN users u2 ON u2.id = r."userId"
        WHERE u2.id IN (SELECT "userId" FROM followers WHERE "followerId" = $1) OR u2.id = $1
        ORDER BY "createdAt" DESC 
        LIMIT 10;
    `,
        [userId],
    );
}; 
const repostRepository = {
    insertRepost,
    userAlreadyRepostedPost,
    getPostsRepostsByUserIdFollows,
};

export default repostRepository;