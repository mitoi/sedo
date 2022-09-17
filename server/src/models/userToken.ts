import {Schema, model, ObjectId} from 'mongoose';

interface UserTokenType {
    userId: ObjectId;
    token: string;
    id: ObjectId;
    createdAt: Date;
}

const userTokenSchema = new Schema<UserTokenType>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 30 * 86400, // 30 days
    },
},
{
    timestamps: {
        updatedAt: 'updatedAt',
    },
});

userTokenSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const UserToken = model('UserToken', userTokenSchema);

export {
    UserToken,
    UserTokenType,
};
