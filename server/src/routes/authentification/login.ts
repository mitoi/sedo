import {Request, Response} from 'express';
import {User} from '../../models/user';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import SedoConfig from '../../config/config';
import {UserToken, UserTokenType} from '../../models/userToken';

const login = async (req: Request, res: Response) => {
    try {
        const {
            email,
            password,
        } = req.body;

        if (!(email && password)) {
            return res.status(400).json({
                error: true,
                message: 'email/password are mandatory',
            });
        }

        const user = await User.findOne({email});

        if (!user) {
            res.status(400).json({
                error: true,
                message: 'Invalid credentials',
            });

            return;
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(400).json({
                error: true,
                message: 'Invalid credentials',
            });

            return;
        }

        const accessToken: string = jwt.sign(
            {
                // eslint-disable-next-line camelcase
                user_id: user.id,
                email,
            },
            SedoConfig.TokenKey,
            {
                expiresIn: SedoConfig.AccessTokenExpiresIn,
            },
        );

        const refreshToken: string = jwt.sign(
            {
                // eslint-disable-next-line camelcase
                user_id: user.id,
                email,
            },
            SedoConfig.RefreshTokenKey,
            {
                expiresIn: SedoConfig.RefreshTokenExpiresIn,
            },
        );

        const userTokenRecord: UserTokenType|null = await UserToken.findOne({
            userId: user.id,
        });

        if (userTokenRecord) {
            await UserToken.findOneAndDelete({
                userId: user.id,
            });
        }

        await UserToken.create({
            userId: user.id,
            token: refreshToken,
        });

        const userMeta = {
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            profilePic: user.profilePic,
            skills: user.skills,
            email: user.email,
            type: user.type,
            rating: user.rating,
            id: user.id,
            expiresIn: SedoConfig.AccessTokenExpiresInSeconds,
            password: '',
            token: accessToken,
            refreshToken,
        };

        res.status(200).json({
            error: false,
            user: userMeta,
        });

        return;
    } catch (err) {
        console.log(err);
    }
};

export {
    login,
};
