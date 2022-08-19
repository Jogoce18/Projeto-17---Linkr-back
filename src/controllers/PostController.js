import PostRepository from "../repositories/PostRepository.js";
import urlMetadata from "url-metadata";
import { hashtagsRepository } from "../repositories/hashtagsRepository.js";
import { likesRepository } from "../repositories/likesRepository.js";
import { commentsRepository } from "../repositories/commentsRepository.js";

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

    const { rows: postData } = await PostRepository.joinPostData(postId[0].id);

    return res.status(201).send(postData[0]);
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
  const id = res.locals.resultUser.id;

  try {
    const { rows: posts } = await PostRepository.getPosts(id);
    const { rows: likes } = await likesRepository.getLikes();
    const { rows: commentsCount } = await commentsRepository.getNumber();
    const joinPosts = posts.map((post) => {
      const filterLikes = likes.filter((like) => like.postId === post.postId);
      const filterComments = commentsCount.filter(
        (comment) => comment.postId === post.postId
      );
      return {
        ...post,
        likes: filterLikes,
        numberComments:
          filterComments.length !== 0 ? filterComments[0].number : 0,
      };
    });
    res.status(200).send(joinPosts);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;
  const { resultUser } = res.locals;
  const postId = parseInt(id);

  try {
    await hashtagsRepository.deleteHashtagsOfPost(postId);
    await likesRepository.removeAllLikes(postId);
    await commentsRepository.deleteAllCommentsInApost(postId);
    await PostRepository.deletingPostQuery(resultUser.id, postId);

    res.sendStatus(200);
  } catch (e) {
    console.log(e);

    return res.sendStatus(500);
  }
}
