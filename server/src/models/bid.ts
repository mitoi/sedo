import {Schema, model, ObjectId} from 'mongoose';

interface BidType {
    adId: ObjectId;
    addUserId: ObjectId;
    bidderUserId: ObjectId;
    price: number;
    description: string;
    type: string;
    category: string;
}

const adSchema = new Schema<BidType>({
    adId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    addUserId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    bidderUserId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    price: Number,
    description: String,
    type: String,
    category: String,
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

const Bid = model<BidType>('bid', adSchema);

export {
    Bid,
    BidType,
};
