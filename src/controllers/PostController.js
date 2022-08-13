import PostRepository from "../repositories/PostRepository.js";
import urlMetadata from "url-metadata";
import { hashtagsRepository } from "../repositories/hashtagsRepository.js";

export async function CreatePost(req, res) {
  try {
    const userId = res.locals.resultUser.id;
    const { url, article } = req.body;
    const { allHashtagsIds } = res.locals;
    const urlData = await urlMetadata(url);

    const { rows:postId } = await PostRepository.createMyPost(
      userId, 
      url, 
      article,
      urlData.title,
      urlData.image,
      urlData.description
    );

    for(let i = 0; i < allHashtagsIds.length; i++){
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
  const { postId, article } = req.body;
  const userId = res.locals.resultUser.id;
  const { allHashtagsIds } = res.locals;

  try {
    await hashtagsRepository.deleteHashtagsOfPost(postId);
    await PostRepository.updatePost(article, postId, userId);

    for(let i = 0; i < allHashtagsIds.length; i++){
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
    const { rows: posts} = await PostRepository.getPosts();

    res.status(200).send(posts);
  } catch(e) {
    console.log(e);
    res.sendStatus(400)
  }
}