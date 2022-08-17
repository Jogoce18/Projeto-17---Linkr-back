import db from "../postgresStrategy/db.js";

async function getLikes() {
  return db.query(`
  SELECT 
    likes."postId",
    users."username",
    likes."userId" as "userId"
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

async function removeLikes(userId, postId) {
  return db.query(
    `
  DELETE FROM likes
  WHERE "userId"=$1 AND "postId"=$2`,
    [userId, postId]
  );
}

async function removeAllLikes(postId) {
  return db.query(
    `
  DELETE FROM likes
  WHERE "postId"=$1`,
    [postId]
  );
}

export const likesRepository = {
  getLikes,
  postLikes,
  removeLikes,
  removeAllLikes,
};
