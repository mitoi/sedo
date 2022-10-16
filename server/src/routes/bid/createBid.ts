import {Request, Response} from 'express';
import {Types} from 'mongoose';
import {Bid} from '../../models/bid';

const createBid = async (req: Request, res: Response) => {
    const {
        adId,
        description,
        bidderUserId
    } = req.body;

    if (!adId) {
        res.status(409).json({
            error: true,
            message: 'Ad ID is missing.',
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

    if (!bidderUserId || !Types.ObjectId.isValid(bidderUserId)) {
        const bidderUserIdFieldName = Object.keys({bidderUserId})[0];
        return invalidField(res, bidderUserId, bidderUserIdFieldName);
    }

    const bidAd = await Bid.create({
        adId,
        description,
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
