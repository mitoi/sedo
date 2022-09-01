import {Request, Response} from 'express';
import {Image, ImageType} from '../../models/image';
import _ from 'lodash';

const getImage = async (req: Request, res: Response) => {
    const {id} = req.query;

    if (!id || !_.isString(id)) {
        res.status(422).json({mesaj: 'Este necesar un id valid.'});

        return;
    }

    const record: ImageType|null = await Image.findById(id);

    if (!record) {
        res.status(422).json({mesaj: `Resursa pentru ${id} nu a putut fi gasita.`});

        return;
    }

    const {data} = record.image;
    const {contentType} = record.image;
    if (data && contentType) {
        res.type(contentType).send(
            `data:${contentType};base64,${Buffer.from(data).toString('base64')}`,
        );
    }
};

export {
    getImage,
};
