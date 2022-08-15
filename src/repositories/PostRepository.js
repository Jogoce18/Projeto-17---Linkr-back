import db from "../postgresStrategy/db.js";

async function createMyPost(
  userId,
  url,
  article,
  urltitle,
  urlimage,
  urldescription
) {
  return db.query(
    `INSERT INTO posts 
    ("userId", url, article, "urlTitle", "urlImage", "urlDescription") VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id`,
    [userId, url, article, urltitle, urlimage, urldescription]
  );
}

async function deletePostById(postId) {
  return db.query(
    `
        DELETE 
        FROM posts
        WHERE id = $1
        `,
    [postId]
  );
}

async function searchPost(postId) {
  return db.query(
    `
    SELECT * 
    FROM posts 
    WHERE id = $1`,
    [postId]
  );
}

async function updatePost(article, postId, userId) {
  return db.query(
    `UPDATE posts 
      SET article = $1 
      WHERE 
        id = $2 AND 
        "userId" = $3`,
    [article, postId, userId]
  );
}

async function getPosts() {
  return db.query(`
  SELECT 
    posts.id AS "postId",
    posts.url,
    posts.article,
    posts."urlTitle",
    posts."urlImage",
    posts."urlDescription",
    users.id AS "userId",
    users."username",
    users."pictureURL" 
  FROM posts 
  JOIN users
  ON posts."userId" = users.id
  ORDER BY posts.id DESC
  `);
}

const PostRepository = {
  deletePostById,
  createMyPost,
  searchPost,
  updatePost,
  getPosts,
};

export default PostRepository;
