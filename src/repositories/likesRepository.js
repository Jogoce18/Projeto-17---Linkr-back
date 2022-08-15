import db from "../postgresStrategy/db.js";

async function getLikes() {
  return db.query(`
  SELECT 
    likes."postId",
    users."username"
  FROM likes
  JOIN users
  ON users.id=likes."userId"
  `);
}

async function postLikes(userId, postId) {
  return db.query(
    `
  INSERT INTO likes
  ("userId","postId")
  values ($1,$2) `,
    [userId, postId]
  );
}
export const likesRepository = {
  getLikes,
  postLikes,
};