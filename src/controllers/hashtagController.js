import { hashtagsRepository } from "../repositories/hashtagsRepository.js";

export async function getHashTags(req, res) {
  try {
    const result = await hashtagsRepository.getTrending();
    if (result.rowCount === 0)
      return res.send("Ainda nao existe trending ").status(404);

    res.send(result.rows).status(200);
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

    const joinHashtags = result.map((post) => {
      const filterLikes = likes.filter((like) => like.postId === result.postId);
      return { ...post, likes: filterLikes };
    });

    res.send(joinHashtags).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
