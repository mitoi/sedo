import {Request, Response} from 'express';
import {UserToken, UserTokenType} from '../../models/userToken';

const logout = async (req: Request, res: Response) => {
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

        const userToken: UserTokenType|null = await UserToken.findOne({
            token: refreshToken,
        });

        if (!userToken) {
            res.status(200).json({
                error: false,
                message: 'Logged Out Successfully',
            });

            return;
        }

        await UserToken.findByIdAndRemove(userToken.id);

        res.status(200).json({
            error: false,
            message: 'Logged Out Successfully',
        });
    } catch (err) {
        // todo handle the error better
        res.status(500).json({
            error: true,
            message: 'Internal Server Error',
        });
        console.log(err);
    }
};

export {
    logout,
};
