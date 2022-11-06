import {Request, Response} from 'express';
import {Image, ImageType} from '../../models/image';
import _ from 'lodash';
import {Types} from "mongoose";

const getImage = async (req: Request, res: Response) => {
    const {id} = req.params;

    if (!id || !_.isString(id)) {
        res.status(422).json({
            error: true,
            message: '\'id\' is required.',
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

    const record: ImageType|null = await Image.findById(id);

    if (!record) {
        res.status(422).json({
            error: true,
            message: `Resource not found, resource id: ${id}.`,
        });

        return;
    }

    const {data, contentType} = record.image;

    if (data && contentType) {
        res.type(contentType).send(data);
    }
};

export {
    getImage,
};
