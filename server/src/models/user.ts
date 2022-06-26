import {Schema, model} from 'mongoose';

interface UserType {
  firstName: string;
  lastName: string;
  phone: string;
  profilePic: string;
  skills: string[];
  email: string;
  type: string;
  rating: string;
  password: string;
  token: string;
  expiresIn: string;
}

const userSchema = new Schema<UserType>({
    firstName: {type: String},
    lastName: {type: String},
    phone: {type: String},
    profilePic: {type: String},
    skills: {type: [String]},
    email: {type: String},
    type: {type: String},
    rating: {type: String},
    password: {type: String},
    token: {type: String},
});

const User = model<UserType>('user', userSchema);

export {
    User,
};
