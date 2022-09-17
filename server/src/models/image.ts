import {Schema, model} from 'mongoose';

interface DataType {
 path: string,
 data: Buffer|null,
 contentType: string,
}

interface ImageType {
 name: string,
 image: DataType,
}

const adSchema = new Schema<ImageType>({
    name: {type: String},
    image: {
        data: Buffer,
        path: String,
        contentType: String,
    },
},
{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
});

adSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Image = model<ImageType>('image', adSchema);

export {
    Image,
    DataType,
    ImageType,
};

