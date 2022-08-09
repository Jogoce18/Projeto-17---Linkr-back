import joi from "joi";

export const headerSchema = joi.object({
    Authorization: joi.string().pattern(/Bearer /),
});