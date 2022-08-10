import { userPatterns } from "../repositories/usersRepository.js";

export function searchUsers(req, res) {
    const { name } = req.query;
    let queryComplement = "";
    const querySupplies = [];

    if (name) {
        querySupplies.push(name);
        queryComplement += `WHERE users.name ILIKE $1 || '%'`;
    }

    const { rows: dbUsers } = await userPatterns.searchUsers(queryComplement, querySupplies);

    res.status(200).send(dbUsers);
}