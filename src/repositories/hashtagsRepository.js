import db from "../postgresStrategy/db.js"


async function insertHashtags(hashtag) {
    return db.query(`
            INSERT INTO hashtags 
            (name) VALUES ($1)
            RETURNING id
        `, hashtag);
}

async function selectHashtags(hashtag) {
    return db.query(`
            SELECT id 
            FROM hashtags 
            WHERE name = $1
        `, [hashtag]);
}
async function getTrending() {
    return db.query(`
            SELECT *
            FROM hashtags 
            LIMIT 10
        `, []);
}

async function insertHashtagsPosts(hashtagId, postId) {
    return db.query(`
            INSERT INTO hashtagsposts
            ("postId", "hashtagId")
            VALUES ($1, $2)
        `, [postId, hashtagId]);
}

async function deleteHashtagsOfPost(postId) {
    return db.query(`
    DELETE 
    FROM hashtagsposts
    WHERE "postId" = $1
    `, [postId]);
}

export const hashtagsRepository = {
    insertHashtags,
    selectHashtags,
    insertHashtagsPosts,
    deleteHashtagsOfPost,
    getTrending
}