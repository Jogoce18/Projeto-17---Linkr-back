import joi from "joi";
const postSchema = joi.object({
  url: joi.string().uri().required(),
  article: joi.string().required(),
  hashtags: joi.string().required(),
});
export default postSchema;
