import db from "../postgresStrategy/db.js"


async function insertHashtags(hashtag) {
    return db.query(`
            INSERT INTO hashtags 
            (name) 
            VALUES ($1)
            RETURNING id
        `, [hashtag]);
}

async function selectHashtags(hashtag) {
    return db.query(`
            SELECT id FROM hashtags WHERE name = $1
        `, [hashtag]);
}

async function insertHashtagsPosts(postId, hashtagId) {
    return db.query(`
            INSERT INTO hashtagsposts
            ("postId", "hashtagId")
            VALUES ($1, $2)
        `, [postId, hashtagId]);
}
const updateMentions = async(queryString) => {
    return db.query(`
        UPDATE hashtags
        SET mentions= mentions + $1
        WHERE id=$2`,
        queryString
    )
}

export const hashtagsRepository = {
    insertHashtags,
    selectHashtags,
    insertHashtagsPosts,
    updateMentions
}