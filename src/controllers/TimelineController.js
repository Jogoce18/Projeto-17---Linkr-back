import db from "../postgresStrategy/db.js"
import urlMetadata from "url-metadata";

export async function timeline(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  console.log(token);

  const { rows: validToken } = await db.query(
    `SELECT * FROM sessions WHERE token = $1`,
    [token]
  );

  if (validToken.length === 0) {
    return res.sendStatus(401);
  }

  try {
    const { rows: posts} = await db.query(
      `select posts.*, users."username", users."pictureURL" FROM posts JOIN users ON posts."userId" = users.id`
    );

    res.send(posts).status(200);
  } catch(e) {
    console.log(e);
    res.sendStatus(400)
  }
}