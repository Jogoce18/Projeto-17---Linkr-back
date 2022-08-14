import { hashtagsRepository } from "../repositories/hashtagsRepository.js";

export async function getHashTags(req, res) {
  const userId = res.locals.userData;
  if (!userId) res.send("usuario nao esta logado").status(401);

  try {
    const result = await hashtagsRepository.getTrending();
    if (result.rowCount === 0)
      return res.send("Trending nao encontrada ").status(404);

    res.send(result.rows).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export async function getHashtagByName(req, res) {
  const { hashtag } = req.params;

  try {
    const result = await hashtagsRepository.getHashtagPosts(hashtag);
    if (result.rowCount == 0) return res.sendStatus(404);
    const [hashtags] = result.rows;
    console.log(hashtags);
    res.send(hashtags).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
