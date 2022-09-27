import {Request, Response} from 'express';
import {User, UserType} from '../../models/user';
import _ from 'lodash';
import {Types} from 'mongoose';

const updateUserInfo = async (req: Request, res: Response) => {
    const {id} = req.params;

    if (!id || !_.isString(id)) {
        res.status(422).json({
            error: true,
            message: 'Id is missing.',
        });

        return;
    }

    if (!Types.ObjectId.isValid(id)) {
        res.status(409).json({
            error: true,
            message: `Invalid Id, '${id}'.`,
        });

        return;
    }

    const user: UserType|null = await User.findById(id);

    if (!user) {
        res.status(404).json({
            error: true,
            message: `User not found: ${id}.`,
        });

        return;
    }

    const fieldsToBeUpdated = Object.fromEntries(
        Object.entries(req.body)
            .filter(
                ([key]) => allowedFieldsForUpdate.includes(key),
            ),
    );

    const userUpdated: UserType|null = await User.findByIdAndUpdate(
        {
            _id: id,
        },
        fieldsToBeUpdated,
        {
            upsert: false,
            new: true,
        },
    );

    res.status(200).json({
        error: false,
        user: userUpdated,
    });
};

const allowedFieldsForUpdate = [
    'firstName',
    'lastName',
    'phone',
    'skills',
    'type',
];


export {
    updateUserInfo,
};
