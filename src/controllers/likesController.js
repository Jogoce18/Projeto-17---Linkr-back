import { likesRepository } from "../repositories/likesRepository.js";

export async function postLikes(req, res) {
  try {
    const { postId } = req.params;
    const { id } = res.locals.resultUser;
    await likesRepository.postLikes(id, postId);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro com o servidor");
  }
}

export async function removeLikes(req, res) {
  try {
    const { postId } = req.params;
    const { id } = res.locals.resultUser;
    await likesRepository.removeLikes(id, postId);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro com o servidor");
  }
}
