import joi from 'joi';

export const schemaSignUp = joi.object({
    username:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().required(),
    pictureURL:joi.string().uri().required(),
});

export const schemaLogin = joi.object({
    email:joi.string().email().required(),
    password:joi.string().required(),
});