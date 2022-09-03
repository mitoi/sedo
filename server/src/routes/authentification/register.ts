import {Request, Response} from 'express';
import {User} from '../../models/user';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import SedoConfig from '../../config/config';

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

        if (!(firstName && lastName && phone
            && email && type && password)) {
            return res.status(400).send('Toate campurile sunt obligatorii');
        }

        const userExists = await User.findOne({email});

        if (userExists) {
            return res.status(409).send('Utilizatoru exista deja');
        }

        let encryptedPass: string;
        try {
            encryptedPass = await bcryptjs.hash(password, SALT);
        } catch (error) {
            return res.status(500).send('Eroare la inregistrare. Incearca din nou.');
        }

        await User.create({
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

        res.status(201).json({
            error: false,
            message: 'User created succfully.',
        });
    } catch (err) {
        console.log(err);
    }
};

export {
    register,
};