import {Schema, Types, model} from 'mongoose';

interface ItemType {
  title: string;
  location: string;
  description: string;
  userId: Types.ObjectId;
  category: string;
  photos: string[];
}

const itemSchema = new Schema<ItemType>({
    title: {type: String},
    location: {type: String},
    description: {type: String},
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    category: {type: String},
    photos: {type: [String]},
});

const Item = model<ItemType>('item', itemSchema);

export {
    Item,
};
