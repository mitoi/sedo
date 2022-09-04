import {Request, Response} from 'express';
import {Image, ImageType} from '../../models/image';
import _ from 'lodash';

const getImage = async (req: Request, res: Response) => {
    const {id} = req.query;

    if (!id || !_.isString(id)) {
        res.status(422).json({
            error: true,
            message: `'id' is required.`,
        });

        return;
    }

    const record: ImageType|null = await Image.findById(id);

    if (!record) {
        res.status(422).json({
            error: true,
            message: `Resource not found, resource id: ${id}.`
        });

        return;
    }

    const {data, contentType} = record.image;

    if (data && contentType) {
        res.type(contentType).json(
            {
                error: false,
                data: `data:${contentType};base64,${Buffer.from(data).toString('base64')}`
            },
        );
    }
};

export {
    getImage,
};
