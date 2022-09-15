import {Request, Response} from 'express';
import * as fs from 'fs';
import {DataType, Image, ImageType} from '../../models/image';
import path from 'path';

const uploadPhoto = async (req: Request, res: Response) => {
    const {file} = req;

    if (!file) {
        res.status(422).json({
            error: true,
            message: `File is missing.`,
        });

        return;
    }

    const saveImageContentDb = true;

    const basePath: string = path.join(__dirname, '../../upload/images/');
    const filePath = `${basePath}${file.filename}`;

    const name: string = req?.body?.name || 'LipsaNume';

    const imageBuffer: Buffer | null = saveImageContentDb ? fs.readFileSync(filePath) : null;

    const image: DataType = {
        contentType: 'image/png',
        path: filePath,
        data: imageBuffer,
    };

    const img:ImageType = {
        name,
        image,
    };

    const record = await Image.create(img);

    if (!record) {
        res.status(500).json({
            error: true,
            message: 'Something went wrong, we were unable to save the image.',
        });

        return;
    }

    const {id} = record;

    res.status(201).json({
        error: false,
        imageId: id,
    });
};

export {
    uploadPhoto,
};
