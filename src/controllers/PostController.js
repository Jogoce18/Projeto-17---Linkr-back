import PostRepository from "../repositories/PostRepository.js";

export async function CreatePost(req, res) {

    try {
 
        const userId = res.locals.id.userId;

        const { url, article } = req.body

        await PostRepository.createMyPost(userId, url, article);

        return res.sendStatus(201)
    }
    catch (e) {
        console.log(e)

        return res.sendStatus(500)
    }

}

export async function DeletePost(req, res){
    try{
        const { id } = req.params;
        await PostRepository.deletePostById(id)
        res.sendStatus(200)
    } 
    catch (err){
        console.log(err)
        res.sendStatus(500)
    }

}