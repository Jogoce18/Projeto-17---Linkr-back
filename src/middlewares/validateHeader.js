import { headerSchema } from "../schemas/headerSchemas.js";
import {sessionPatterns} from '../repositories/sessionsRepository.js';

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function validateHeader(req, res, next) {
    const header = { Authorization: req.headers.authorization };
    if (!header) {
        res.sendStatus(422);
        return;
    }
    const { error } = headerSchema.validate(header);

    if (error) {
        res.sendStatus(422);
        return;
    } 

    next();
}

export async function validateToken(req, res, next) {
    
    try {
        if (!req.headers.authorization) return res.sendStatus(422);
        const token = req.headers.authorization.replace("Bearer ", "");
        const queryComplement = "WHERE sessions.token = $1";
        const querySupplies = [token];
        const { rows: dbSessions } = await sessionPatterns.selectSessions(queryComplement, querySupplies);

        if (!dbSessions.length) {
            res.sendStatus(401);
            return;
        }

        const secret_key = process.env.JWT_SECRET;

        res.locals.id = jwt.verify(token, secret_key);

        next();
    } catch (e) {
        console.log(e);
        res.sendstatus(500);
    }
}