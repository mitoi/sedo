import {Request, Response} from 'express';
import {Ad} from '../../models/ad';
import {Types} from 'mongoose';
import {BSONTypeError} from 'bson';

const createAd = async (req: Request, res: Response) => {
    const {
        title,
        description,
        photos,
        userId,
        type,
        category,
        price,
    } = req.body;


    if (!(title && description && userId
        && type && category && price)) {
        return res.status(400).json({
            error: true,
            message: 'Missing fields. Required fields: title, description, category, userId, type, price.',
        });
    }

    if (!Types.ObjectId.isValid(userId)) {
        res.status(409).json({
            error: true,
            message: `Invalid id, '${userId}'`,
        });

        return;
    }

    const userMongoId = new Types.ObjectId(userId);

    const newAd = await Ad.create({
        title,
        description,
        photos,
        userId: userMongoId,
        type,
        category,
        price,
    });

    if (!newAd) {
        res.status(500).json({
            error: true,
            message: 'Something went wrong, we were unable to create the ad. Please try again later.',
        });

        return;
    }

    res.status(201).json({
        error: false,
        id: newAd.id
    });
};

export {
    createAd,
};
