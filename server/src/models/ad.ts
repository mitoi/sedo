import {Schema, model, ObjectId} from 'mongoose';

interface Photo {
  id: string;
  positionIndex: string;
};

interface AdType {
  title: string;
  description: string;
  photos: Photo[]|undefined;
  userId: ObjectId;
  type: string;
  category: string;
  price: string;
};

const adSchema = new Schema<AdType>({
    title: {type: String},
    description: {type: String},
    photos: [{
      type: Object,
    }],
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
    },
    category: String,
    price: String
});

const Ad = model<AdType>('ad', adSchema);

export {
  Ad,
  AdType,
};
