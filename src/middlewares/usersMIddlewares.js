import { userPatterns } from "../repositories/usersRepository.js";

export function validateUserId(req, res, next) {
    const userId = req.params.id;
    const { rows: dbUsers } = userPatterns.selectUserById(userId);

    if (!dbUsers.length) {
        res.sendStatus(404);
        return;
    }

    next();
}