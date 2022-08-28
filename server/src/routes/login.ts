import {Request, Response} from 'express';
import {User} from '../models/user';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import SedoConfig from '../config/config';

const login = async (req: Request, res: Response) => {
    try {
        const {
            email,
            password,
        } = req.body;

        if (!(email && password)) {
            return res.status(400).send('Toate campurile sunt obligatorii');
        }

        const user = await User.findOne({email});

        if (user && (await bcryptjs.compare(password, user.password))) {
            const token: string = jwt.sign(
                {
                    // eslint-disable-next-line camelcase
                    user_id: user.id,
                    email,
                },
                SedoConfig.TokenKey,
                {
                    expiresIn: '2h',
                },
            );

            user.token = token;
            user.expiresIn = '7200'; //2 hrs
            user.password = '';
            return res.status(200).json(user);
        }

        return res.status(400).send('Credentiale invalide');
    } catch (err) {
        console.log(err);
    }
};

export {
    login,
};
