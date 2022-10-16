import {Request, Response} from 'express';
import {Types} from 'mongoose';
import {Bid} from '../../models/bid';

const createBid = async (req: Request, res: Response) => {
    const {adId} = req.params;

    if (!adId) {
        res.status(404).json({
            error: true,
            message: 'Ad ID is missing from URL.',
        });

        return;
    }

    if (!Types.ObjectId.isValid(adId)) {
        res.status(409).json({
            error: true,
            message: `Invalid Ad Id, '${adId}`,
        });

        return;
    }

    const {
        price,
        description,
        bidderUserId,
        addUserId,
        type,
        category,
    } = req.body;

    if (!price) {
        const priceFieldName = Object.keys({price})[0];
        return invalidField(res, price, priceFieldName);
    }

    if (!bidderUserId || !Types.ObjectId.isValid(bidderUserId)) {
        const bidderUserIdFieldName = Object.keys({bidderUserId})[0];
        return invalidField(res, bidderUserId, bidderUserIdFieldName);
    }

    if (!addUserId || !Types.ObjectId.isValid(addUserId)) {
        const addUserIdFieldName = Object.keys({addUserId})[0];
        return invalidField(res, addUserId, addUserIdFieldName);
    }

    const bidAd = await Bid.create({
        adId,
        price,
        description,
        type,
        category,
        addUserId,
        bidderUserId,
    });

    if (!bidAd) {
        return res.status(500).json({
            error: true,
            message: 'Something went wrong, we were unable to create the ad. Please try again later.',
        });
    }

    res.status(201).json({
        error: false,
        id: bidAd.id,
    });
};

const invalidField = (res: Response, field: any, fieldName: any) => res.status(422).json({
    error: true,
    message: `Invalid '${fieldName}' field, value:'${field}'`,
});

export {
    createBid,
};
