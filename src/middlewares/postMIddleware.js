import { hashtagsRepository } from "../repositories/hashtagsRepository.js";
import PostRepository from "../repositories/PostRepository.js";

const haveHashtag = async (req, res, next) => {
    const { article } = req.body;
    const allHashtagsIds = [];

    try{
        const descriptionArray = article.split(" ");
        const allHashtags = descriptionArray.filter((string) => {
            return string[0] == "#";
        });

        for(let i = 0; i < allHashtags.length; i++){
            const hashtag = allHashtags[i];
            const { rows:hashtagDb } = await hashtagsRepository.selectHashtags(hashtag);

            if(!hashtagDb.length){
                const queryString = [
                    hashtag,
                ];
                
                const { rows: hashtagId } = await hashtagsRepository.insertHashtags(queryString);
                allHashtagsIds.push(hashtagId[0].id);
            } else {
                allHashtagsIds.push(hashtagDb[0].id);
            }
        }
        
        res.locals.allHashtagsIds = allHashtagsIds;
        
        next();
    }catch(error){
        console.log(error)
        console.log(`[ERRO] In haveHashtag Middlware`);
        return res.sendStatus(500);
    };
}

const validatePostExistence = async (req, res, next) => {
    const postId = req.params.id;
    const { rows: validatePost } = await PostRepository.searchPost(postId);
  
    if (validatePost.length === 0) {
        res.sendStatus(404);
        return; 
    }

    next();
}

const verifyIfPostBelongsToUser = async (req, res, next) => {
    const postId = req.params.id;
    const userId = res.locals.resultUser.id;
    const { rows: validatePost } = await PostRepository.searchPost(postId);

    if (validatePost[0].userId !== userId) {
        res.sendStatus(401);
        return;
    }

    next();
}

export { haveHashtag, validatePostExistence, verifyIfPostBelongsToUser };