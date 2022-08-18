import db from "../postgresStrategy/db.js";

async function getCommentsbyId(postId) {
  return db.query(
    `
  SELECT 
    comments.text,
    users.username,
    users."pictureURL"
  FROM comments
  JOIN users
  ON users.id=comments."userId"
  WHERE "postId"=$1
  `,
    [postId]
  );
}

async function postComment(text, userId, postId) {
  return db.query(
    `
  INSERT INTO comments 
  (text,"userId","postId") VALUES ($1,$2,$3)`,
    [text, userId, postId]
  );
}

async function getNumber() {
  return db.query(
    `
    SELECT COUNT(id) as number,"postId"
    from comments
    GROUP BY "postId"
  `
  );
}

export const commentsRepository = {
  postComment,
  getCommentsbyId,
  getNumber,
};
