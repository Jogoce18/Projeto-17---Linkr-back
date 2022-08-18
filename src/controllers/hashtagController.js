import { hashtagsRepository } from "../repositories/hashtagsRepository.js";
import { likesRepository } from "../repositories/likesRepository.js";

export async function getHashTags(req, res) {
  try {
    const result = await hashtagsRepository.getTrending();
    if (result.rowCount === 0)
      return res.send("Ainda nao existe trending ").status(404);

    res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export async function getHashtagByName(req, res) {
  const { hashtag } = req.params;

  try {
    const { rows: result } = await hashtagsRepository.getHashtagPosts(hashtag);
    if (result.length === 0) return res.sendStatus(404);

    const { rows: likes } = await likesRepository.getLikes();

    const joinHashtags = result.map((elem) => {
      const filterLikes = likes.filter((like) => like.postId === elem.postId);
      return { ...elem, likes: filterLikes };
    });
    res.status(200).send(joinHashtags);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
