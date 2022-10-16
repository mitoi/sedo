import {Request, Response} from 'express';
import _ from 'lodash';
import {Types} from 'mongoose';
import {Bid, BidType} from '../../models/bid';
import {User, UserType} from '../../models/user';

interface UsersCacheType {
    [key: string]: UserType|null
}

interface ResponseBids extends BidType {
    bidderUser: UserType|null,
    adUser: UserType|null,
}

const getBid = async (req: Request, res: Response) => {
    const {id} = req.params;

    if (!id || !_.isString(id)) {
        res.status(422)
            .json({
                error: true,
                message: 'Id is missing.',
            });

        return;
    }

    if (!Types.ObjectId.isValid(id)) {
        res.status(409)
            .json({
                error: true,
                message: `Invalid Id, '${id}'.`,
            });

        return;
    }

    const records: BidType|null = await Bid.findById(id).lean();

    if (!records) {
        res.status(404)
            .json({
                error: true,
                message: `Resource not found, resource id: ${id}.`,
            });

        return;
    }

    const record: ResponseBids = await _getDetailedBid(records);

    res.status(200).json({
        error: false,
        record,
    });
};

export const _getDetailedBid = async (record: BidType) => {
    const bidderUsers: UsersCacheType = {};
    const adUsers: UsersCacheType = {};

    const {addUserId, bidderUserId} = record;

    const addUserIdString = addUserId.toString();
    const bidderUserIdString = bidderUserId.toString();

    if (!_.has(bidderUsers, bidderUserIdString)) {
        const bidUser:UserType|null = await User.findById(bidderUserId).select('-password').lean();

        // @ts-ignore
        bidderUsers[bidderUserIdString] = bidUser;
    }

    if (!_.has(adUsers, addUserIdString)) {
        const adUser:UserType|null = await User.findById(addUserId).select('-password').lean();

        // @ts-ignore
        adUsers[addUserIdString] = adUser;
    }

    const bid: ResponseBids = {
        ...record,
        bidderUser: bidderUsers[bidderUserIdString],
        adUser: adUsers[addUserIdString],
    };

    return bid;
};

export {
    getBid,
};
