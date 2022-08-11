import db from "../postgresStrategy/db.js"




async function createMyPost(userId, url, article) {
    return connection.query(`
        INSERT INTO posts ("userId",url,article)
        values ($1,$2,$3)`,
        [userId, url, article])
}

async function deletePostById(id) {
    return db.query(
        `
        DELETE FROM posts
        WHERE id = $1
        `, [id]
    )
}

async function compareUserAndIdPost(userId, idPost){
    return db.query( `
        SELECT * FROM posts
        WHERE "userId" = $1 AND id = $2
    `, [userId, idPost])
}

const PostRepository = {
 
    deletePostById,
    compareUserAndIdPost,
    createMyPost
};

export default PostRepository;