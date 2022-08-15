import PostRepository from "../repositories/PostRepository.js";
import urlMetadata from "url-metadata";
import { hashtagsRepository } from "../repositories/hashtagsRepository.js";
import { likesRepository } from "../repositories/likesRepository.js";

export async function CreatePost(req, res) {
  try {
    const userId = res.locals.resultUser.id;
    const { url, article } = req.body;
    const { allHashtagsIds } = res.locals;
    const urlData = await urlMetadata(url);

    const { rows: postId } = await PostRepository.createMyPost(
      userId,
      url,
      article,
      urlData.title,
      urlData.image,
      urlData.description
    );

    for (let i = 0; i < allHashtagsIds.length; i++) {
      const hashtagId = allHashtagsIds[i];

      await hashtagsRepository.insertHashtagsPosts(hashtagId, postId[0].id);
    }

    return res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function editPost(req, res) {
  const { article } = req.body;
  const postId = req.params.id;
  const userId = res.locals.resultUser.id;
  const { allHashtagsIds } = res.locals;

  try {
    await hashtagsRepository.deleteHashtagsOfPost(postId);
    await PostRepository.updatePost(article, postId, userId);

    for (let i = 0; i < allHashtagsIds.length; i++) {
      const hashtagId = allHashtagsIds[i];

      await hashtagsRepository.insertHashtagsPosts(hashtagId, postId);
    }

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function timeline(req, res) {
  try {
    const { rows: posts } = await PostRepository.getPosts();
    const { rows: likes } = await likesRepository.getLikes();

    const joinPosts = posts.map((post) => {
      const filterLikes = likes.filter((like) => like.postId === post.postId);
      return { ...post, likes: filterLikes };
    });

    res.status(200).send(joinPosts);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
}
export async function deletePost(req, res) {
  const { id } = req.params;
  const { userInfo } = res.locals;
  const postId = parseInt(id);
  try {
      const { rowCount } = await PostRepository.deletingPostQuery(
          userInfo.userId,
          postId
      );

      if (rowCount !== 1) {
          return res.sendStatus(404);
      }

      res.sendStatus(200);
  } catch (e) {
      console.log(e);

      return res.sendStatus(500);
  }
}