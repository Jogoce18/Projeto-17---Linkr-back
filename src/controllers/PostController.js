import PostRepository from "../repositories/ PostRepository";

export async function CreatePost(req, res) {

    try {

        const userId = 1

        const { url, description } = req.body

        await PostRepository.createMyPost(userId, url, description);

        return res.send(201)
    }
    catch {
        console.log('deuruim')

        return res.send(500)
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