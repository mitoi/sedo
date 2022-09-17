import {Request, Response} from 'express';
import _ from 'lodash';
import {Ad, AdType} from '../../models/ad';
import {Types} from 'mongoose';

const getAd = async (req: Request, res: Response) => {
    const {id} = req.query;

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

    const record: AdType|null = await Ad.findById(id);

    if (!record) {
        res.status(404).json({
            error: true,
            message: `Resource not found, resource id: ${id}.`,
        });

        return;
    }

    res.status(200).json({
        error: false,
        record,
    });
};

export {
    getAd,
};
