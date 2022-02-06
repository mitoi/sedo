import {Request, Response} from 'express';
import {User} from '../models/user';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import SedoConfig from '../config/config';

const register = async (req: Request, res: Response) => {
    try {
        const SALT: number = 11;
        const {
            firstName,
            lastName,
            phone,
            profilePic,
            skills,
            email,
            type,
            rating,
            password,
        } = req.body;

        if (!(firstName && lastName && phone && profilePic && skills
            && email && type && rating && password)) {
            return res.status(400).send('Toate campurile sunt obligatorii');
        }

        const userExists = await User.findOne({email});

        if (userExists) {
            return res.status(409).send('Utilizatoru exista deja');
        }

        const encryptedPass: string = await bcryptjs.hash(password, SALT);

        const user = await User.create({
            firstName,
            lastName,
            phone,
            profilePic,
            skills,
            email: email.toLowerCase(),
            type,
            rating,
            password: encryptedPass,
        });

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

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }

    return res.send({
        status: 'registered',
    });
};

export {
    register,
};
