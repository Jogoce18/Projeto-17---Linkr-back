import verboseLog from "../utils/verboseLog.js";
import repostRepository from "../repositories/repostRepository.js";

 export const newRepost = async (req, res) => {

    const userId = res.locals.resultUser.id;
    const postId = req.params.postId;

    try {
         const alreadyRepostedPost =
        await repostRepository.userAlreadyRepostedPost(userId, postId);
 
       if (alreadyRepostedPost.rows.length) return res.sendStatus(204);  
        const {rows:result} = await repostRepository.insertRepost(userId, postId);
            
         if (!result.length) return res.sendStatus(404); 
 
        res.sendStatus(201);
    } catch (err) {
        verboseLog(err);
        res.sendStatus(500);
    }
};

export async function getReposts(req,res){

     const userId = res.locals.resultUser.id;
    try {
        const { rows:reposts } = await repostRepository.getPostsRepostsByUserIdFollows(userId);

        res.status(200).send(reposts)
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}