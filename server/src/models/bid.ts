import {Schema, model, ObjectId} from 'mongoose';

interface BidType {
    adId: ObjectId;
    bidderUserId: ObjectId;
    description: string;
}

const adSchema = new Schema<BidType>({
    adId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'ad',
    },
    bidderUserId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    description: String,
},
{
    minimize: false,
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
});

adSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Bid = model<BidType>('bid', adSchema);

export {
    Bid,
    BidType,
};
