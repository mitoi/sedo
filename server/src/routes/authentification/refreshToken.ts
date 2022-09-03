import {Request, Response} from 'express';
import {User, UserType} from '../../models/user';
import * as jwt from 'jsonwebtoken';
import SedoConfig from '../../config/config';
import {UserToken, UserTokenType} from '../../models/userToken';
import _ from 'lodash';

const refreshUserToken = async (req: Request, res: Response) => {
    try {
        const {
            refreshToken,
        } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                error: true,
                message: 'refreshToken parameter is mandatory.',
            });
        }

        if (!_.isString(refreshToken)) {
            return res.status(400).json({
                error: true,
                message: 'refreshToken should be string',
            });
        }

        const userToken: UserTokenType|null = await UserToken.findOne({
            token: refreshToken,
        });

        if (!userToken) {
            res.status(400).json({
                error: true,
                message: 'Invalid refreshToken.',
            });

            return;
        }

        const userTokenDetails: string | jwt.JwtPayload = jwt.verify(refreshToken, SedoConfig.RefreshTokenKey);

        if (!userTokenDetails) {
            res.status(400).json({
                error: true,
                message: 'Invalid signature.',
            });

            return;
        }

        const user: UserType|null = await User.findById(userToken.userId);

        if (!user) {
            res.status(400).json({
                error: true,
                message: `User not found for the RefreshToken invalid ${refreshToken}.`,
            });

            return;
        }

        const accessToken: string = jwt.sign(
            {
                // eslint-disable-next-line camelcase
                user_id: user.id,
                email: user.email,
            },
            SedoConfig.TokenKey,
            {
                expiresIn: SedoConfig.AccessTokenExpiresIn,
            },
        );

        res.status(201).json({
            error: false,
            accessToken,
            message: 'Access token created successfully',
        });
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            res.status(400).json({
                error: true,
                message: err.message,
            });
        }
    }
};

export {
    refreshUserToken,
};
