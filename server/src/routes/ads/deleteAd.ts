import {Request, Response} from 'express';
import _ from 'lodash';
import {Ad, AdType} from '../../models/ad';
import {Types, Error} from 'mongoose';

const deleteAd = async (req: Request, res: Response) => {
    const {id} = req.params;

    if (!id|| !_.isString(id)) {
        res.status(422).json({
            error: true,
            message: `Id is missing.`,
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

    const record: AdType|null = await Ad.findByIdAndDelete(id);

    if (!record) {
        res.status(404).json({
            error: true,
            message: `Resource not found, resource id: '${id}'.`,
        });

        return;
    }

    res.status(202).send();
};

export {
    deleteAd,
};
