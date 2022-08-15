import { likesRepository } from "../repositories/likesRepository.js";

export async function postLikes(req, res) {
  try {
    const { postId } = req.params;
    const { id } = res.locals.resultUser;
    await likesRepository.postLikes(id, postId);
  } catch (e) {
    res.status(500).send("Erro com o servidor");
  }
}
