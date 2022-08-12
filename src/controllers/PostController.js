import PostRepository from "../repositories/PostRepository.js";
import urlMetadata from "url-metadata";

export async function CreatePost(req, res) {
  
  
    try {
      const userId = res.locals.id.userId;

      const { url, article } = req.body

      urlMetadata(url).then(
        async function (metadata) {
        console.log(metadata);

          await PostRepository.createMyPost(
            userId, 
            url, 
            article,
            metadata.title,
            metadata.image,
            metadata.description
          );
        },
        function (error) {
        
          console.log(error, "esse");
        }
      );
      return res.sendStatus(201);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  export async function editPost(req, res) {
    const { postId, article } = req.body;
    const { userId } = res.locals.id.userId;
    try {
      const { rows: validatePost } = await PostRepository.searchPost(
        postId
      );
      if (validatePost.length === 0) {
        return res.sendStatus(404);
      }
      if (validatePost[0].userId !== userId) {
        return res.sendStatus(401);
      }
      await PostRepository.updatePost(article, postId, userId);
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

