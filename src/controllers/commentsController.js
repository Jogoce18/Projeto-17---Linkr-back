import { commentsRepository } from "../repositories/commentsRepository";

export default function getComments(req, res) {
  const {postId} = req.params

  try{
    const comments=await commentsRepository.getCommentsbyId(postId)
    res.status(200).send(comments);
    
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro com o servidor");
  }
}

export default function postComment(req, res) {
  const { resultUser } = req.locals
  const {text,postId} = req.body
  try{
    await commentsRepository.postComment(text,resultUser.id,postId)
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro com o servidor");
  }
}

