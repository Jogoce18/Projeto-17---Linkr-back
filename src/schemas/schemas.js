import joi from 'joi'

function validateSignUp(body){
    const schemaUsuarios=joi.object({
        username:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().required(),
        picture:joi.string().uri().required()
    })
    const validation=schemaUsuarios.validate(body)
    return validation.error
}

function validateLogin(body){
    const schemaUsuarios=joi.object({
        email:joi.string().email().required(),
        password:joi.string().required()
    })
    const validation=schemaUsuarios.validate(body)
    return validation.error
}

export const schemaFunctions={
    validateSignUp,
    validateLogin
}