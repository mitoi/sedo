import {Request, Response} from 'express';
import _ from 'lodash';
import {ObjectId, Types} from 'mongoose';
import {Bid, BidType} from '../../models/bid';
import {UserType} from '../../models/user';
import {InvalidRequest} from '../../utils/exceptions/InvalidId';

interface FilterUserType {
    [key: string]: string,
}

interface CustomUserType extends UserType {
    _id?: ObjectId|null
}

interface ResponseBid extends BidType {
    bidderUser: CustomUserType|null,
}

const getBidsByAd = async (req: Request, res: Response) => {
    const {adId} = req.params;
    const type: string = 'bidderUser';

    let records = [];
    const filter: FilterUserType = {
        adId,
    };

    try {
        records = await getBidsBy(adId, 'adId', type, filter);
    } catch (e) {
        if (e instanceof InvalidRequest) {
            res.status(e.code)
                .json({
                    error: true,
                    message: e.message,
                });

            return;
        }

        throw e;
    }

    res.status(200).json({
        error: false,
        records,
    });
};

const getUserBids = async (req: Request, res: Response) => {
    const {userId} = req.params;
    const type: string = 'bidderUser';

    let records = [];
    const filter: FilterUserType = {
        bidderUserId: userId,
    };

    try {
        records = await getBidsBy(userId, 'userId', type, filter);
    } catch (e) {
        if (e instanceof InvalidRequest) {
            res.status(e.code)
                .json({
                    error: true,
                    message: e.message,
                });

            return;
        }

        throw e;
    }

    res.status(200).json({
        error: false,
        records,
    });
};

const getBidsBy = async (id: string, variableName: string, type: string, filter: FilterUserType) => {
    if (!id || !_.isString(id)) {
        throw new InvalidRequest(422, `${variableName} is missing.`);
    }

    if (!Types.ObjectId.isValid(id)) {
        throw new InvalidRequest(409, `Invalid ${variableName}, '${id}'.`);
    }

    const records: BidType[]|null = await Bid.find(filter)
        .sort({createdAt: 'asc'})
        .populate([
            {
                path: 'bidderUserId',
                model: 'user',
                select: '-password',
            },
        ])
        .lean();

    if (!records) {
        throw new InvalidRequest(404, `Resource not found, resource id: ${id}.`);
    }

    const bids: ResponseBid[] = _sanitizeBidModels(records);

    return bids;
};

export const _sanitizeBidModels = (records: BidType[]) => {
    const bidsResponse: ResponseBid[] = [];

    for (const record of records) {
        const {bidderUserId} = record;

        const bidResponse: ResponseBid = {
            ...record,
            bidderUser: null,
        };

        if (bidderUserId) {
            const hasBidderUser = Object.keys(bidderUserId).length > 1;

            if (hasBidderUser) {
                bidResponse.bidderUser = record.bidderUserId as unknown as UserType;
                bidResponse.bidderUserId = bidResponse.bidderUser._id as unknown as ObjectId;
            }
        }

        bidsResponse.push(bidResponse);
    }

    return bidsResponse;
};

export {
    getBidsByAd,
    getUserBids,
};
