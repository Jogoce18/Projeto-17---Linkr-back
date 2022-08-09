import { headerSchema } from "../schemas/headerSchemas.js";
import { sessionPatterns } from "../repositories/sessionsRepository.js";

export async function validateHeader(req, res, next) {
    const header = { Authorization: req.headers.authorization };
    const { error } = headerSchema.validate(header);

    if (error) {
        res.sendStatus(422);
        return;
    }

    next();
}

export async function validateToken(req, res, next) {
    const token = req.header.authorization.replace("Bearer ", "");
    const queryComplement = "WHERE sessions.token = $1";
    const querySupplies = [token];
    const { rows: dbSessions } = await sessionPatterns.selectUserSession(queryComplement, querySupplies);

    if (!dbSessions.length) {
        res.sendStatus(401);
        return;
    }

    next();
}