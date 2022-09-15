import multer from 'multer';
import {Request} from 'express';
import path from 'path';
const uploadDirPath = path.join(__dirname, '../upload/images');

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const uploadFile = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback: DestinationCallback): void => {
        callback(null, uploadDirPath);
    },
    filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback): void => {
        //todo: generate mongoId
        callback(null, `${file.originalname}-${Date.now()}.png`);
    },
});

const upload = multer({storage: uploadFile});

export {
    upload,
};
