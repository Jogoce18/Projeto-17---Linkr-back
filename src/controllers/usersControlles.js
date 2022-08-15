import { userPatterns } from "../repositories/usersRepository.js";

export async function searchUsers(req, res) {
    const { name } = req.query;
    let queryComplement = "";
    const querySupplies = [];

    if (name) {
        querySupplies.push(name);
        queryComplement += `WHERE users.username ILIKE $1 || '%'`;
    }

    const { rows: dbUsers } = await userPatterns.searchUsers(queryComplement, querySupplies);

    res.status(200).send(dbUsers);
}

export async function searchUserPosts (req, res) {
    const userId = req.params.id;

    try {
        const { rows: userPosts } = await userPatterns.selectUserPosts(userId);

        res.status(200).send(userPosts);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}