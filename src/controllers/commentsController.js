import { commentsRepository } from "../repositories/commentsRepository.js";

export async function getCommentsbyId(req, res) {
  const { postId } = req.params;

  try {
    const { rows: comments } = await commentsRepository.getCommentsbyId(postId);
    res.status(200).send(comments);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro com o servidor");
  }
}

export async function postComment(req, res) {
  const { resultUser } = res.locals;
  const { text } = req.body;
  const { postId } = req.params;
  try {
    await commentsRepository.postComment(text, resultUser.id, postId);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro com o servidor");
  }
}
