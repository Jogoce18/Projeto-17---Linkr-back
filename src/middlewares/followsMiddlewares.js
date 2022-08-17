import { userPatterns } from "../repositories/usersRepository.js"

export async function validateIds (req, res, next) {
    const { userId, followerId } = req.params;
    const queryComplement = `WHERE id = $1 OR id = $2`;
    const querySupplies = [userId, followerId];

    const { rows: dbUsers} = await userPatterns.searchUsers(queryComplement, querySupplies);

    if (!dbUsers.length) {
        res.sendStatus(404);
        return;
    }

    next();
}