import {NextFunction, Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import SedoConfig from '../config/config';

const jwtValidator = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader: string|undefined = req.headers.authorization;

    if (authHeader) {
        const secondPosition = 1;
        const token = authHeader.split(' ')[secondPosition];

        if (!token) {
            res.status(401).send('Invalid token!');

            return;
        }

        try {
            const user = jwt.verify(
                token,
                SedoConfig.TokenKey,
            );

            // @ts-ignore
            req.user = user;

            next();
        } catch (e) {
            return res.sendStatus(403);
        }
    } else {
        res.status(401).json({
            error: true,
            message: 'User is not authorized.',
        });
    }
};

export {
    jwtValidator,
};
