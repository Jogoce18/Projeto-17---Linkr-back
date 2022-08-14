import { userPatterns } from "../repositories/usersRepository.js";

export async function validateUserId(req, res, next) {
    const userId = req.params.id;
    const { rows: dbUsers } = await userPatterns.selectUserById(userId);

    if (!dbUsers.length) {
        res.sendStatus(404);
        return;
    }

    next();
}