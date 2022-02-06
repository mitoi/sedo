import SedoConfig from '../config/config';
import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';

const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.body?.token || req.query?.token || req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send('Pentru aceasta operatiune este nevoie sa fiti autentificati');
    }

    try {
        const decoded = jwt.verify(
            token,
            SedoConfig.TokenKey,
        );

        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Token Invalid');
    }

    return next();
};

export {
    auth,
};
