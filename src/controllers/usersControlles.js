import { userPatterns } from "../repositories/usersRepository.js";

export async function searchUsers(req, res) {
    const { name, userId, followerId } = req.query;
    let queryComplement = "";
    const querySupplies = [];

    if (name) {
        const tam = querySupplies.length;
        querySupplies.push(name.trimLeft());
        queryComplement += tam ? `AND LOWER(users.username) LIKE LOWER($1) || '%'`: `WHERE users.username ILIKE $1 || '%'`;
    }

    if (name && followerId) {
        const { rows: dbUsers} = await userPatterns.searchUsersBasedOnNameAndOrderedByFollowingState(followerId, name);

        res.status(200).send(dbUsers);
        return;
    }

    if (userId) {
        const tam = querySupplies.length;
        querySupplies.push(userId);
        queryComplement += tam ? `AND users.id = $${querySupplies.length}'`: `WHERE users.id = $${querySupplies.length}`;
    }

    let { rows: dbUsers } = await userPatterns.searchUsers(queryComplement, querySupplies);

    

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