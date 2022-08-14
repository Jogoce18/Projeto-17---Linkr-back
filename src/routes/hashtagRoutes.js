import { Router } from "express"
import { getHashTags , getHashtagByName } from "../controllers/hashtagController.js"


const hashtagRouter= Router()



hashtagRouter.get("/trending",getHashTags)
hashtagRouter.get("/hashtag/:hashtag", getHashtagByName)





export default hashtagRouter;