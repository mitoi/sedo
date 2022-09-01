import {Schema, model} from 'mongoose';

interface AdType {
  name: string;
  description: string;
  photo: string;
  userId: string;
  skills: string[];
  email: string;
  type: string;
  rating: string;
  password: string;
  token: string;
}

const adSchema = new Schema<AdType>({
    name: {type: String},
    description: {type: String},
    photo: {type: String},
    userId: {type: String},
    token: {type: String},
});

const User = model<AdType>('ad', adSchema);

export {
    User,
};
