import { hashtagsRepository } from "../repositories/hashtagsRepository.js";



export async function getHashTags(req,res){

    try {
        const result = await hashtagsRepository.getTrending()
        if(result.rowCount === 0)return res.send("Ainda nao existe trending ").status(404)

        res.send(result.rows).status(200)
      
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
   

}
export async function getHashtagByName(req, res) {
  const { hashtag } = req.params;

  try {
    const result = await hashtagsRepository.getHashtagPosts(hashtag);
    console.log(result)
    if (result.rowCount == 0) return res.sendStatus(404);
    console.log(result.rows)
    res.send(result.rows).status(200);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
