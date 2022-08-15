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
async function getHashtagPosts(hashtag){
    return db.query(`
    select hs."hashtagId" , h.name , p.article , p."urlImage" , p."urlDescription", u.username , u."pictureURL" p.url   FROM hashtagsposts hs
    JOIN hashtags h ON hs."hashtagId"=h.id
    JOIN posts p ON hs."postId"=p.id
    JOIN users u ON p."userId"=u.id
    WHERE h.name=$1;
    `,[hashtag])

}
async function getTrending() {
    return db.query(`
    select h.name , COUNT ( h.name) as "quanty"  from hashtagsposts hs
    JOIN hashtags h ON hs."hashtagId"=h.id
    GROUP BY h.name
    ORDER BY quanty DESC
    LIMIT 10;
        `, );
}
export const hashtagsRepository = {
    insertHashtags,
    selectHashtags,
    insertHashtagsPosts,
    deleteHashtagsOfPost,
    getTrending,
    getHashtagPosts
}