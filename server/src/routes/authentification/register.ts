import {Request, Response} from 'express';
import {User} from '../../models/user';
import * as bcryptjs from 'bcryptjs';

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
            return res.status(400).json({
                error: true,
                message: 'Missing fields. Required fields: firstName, lastName, phone, email, type, passsword.',
            });
        }

        const userExists = await User.findOne({email});

        if (userExists) {
            res.status(409).json({
                error: true,
                message: 'User already exists.',
            });

            return;
        }

        let encryptedPass: string;
        try {
            encryptedPass = await bcryptjs.hash(password, SALT);
        } catch (error) {
            return res.status(500).send({
                error: true,
                message: 'Something went wrong, we were unable to register the user. Please try again later.',
            });
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
            message: 'User created successfully.',
        });
    } catch (err) {
        console.log(err);
    }
};

export {
    register,
};
