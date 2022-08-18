import joi from "joi";

export const schemaComments = joi.object({
  text: joi.string().required(),
});
