import {Request, Response} from 'express';
import _ from 'lodash';
import {Types} from 'mongoose';
import {Bid, BidType} from '../../models/bid';
import {User, UserType} from '../../models/user';
import {InvalidRequest} from '../../utils/exceptions/InvalidId';

interface UsersCacheType {
    [key: string]: UserType|null
}

interface FilterUserType {
    [key: string]: string,
}

interface ResponseBids extends BidType {
    bidderUser: UserType|null,
    adUser: UserType|null,
}

const getBidsByUserAd = async (req: Request, res: Response) => {
    const {id} = req.params;
    const type: string = 'adUser';

    let records = [];

    try {
        records = await getUserBy(id, type);
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

const getBidsByUserBidder = async (req: Request, res: Response) => {
    const {id} = req.params;
    const type: string = 'bidderUser';

    let records = [];

    try {
        records = await getUserBy(id, type);
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

const getUserBy = async (id: string, type: string) => {
    if (!id || !_.isString(id)) {
        throw new InvalidRequest(422, 'Id is missing.');
    }

    if (!Types.ObjectId.isValid(id)) {
        throw new InvalidRequest(409, `Invalid Id, '${id}'.`);
    }

    const filter: FilterUserType = type === 'adUser' ? {addUserId: id} : {bidderUserId: id};

    const records: BidType[]|null = await Bid.find(filter).lean();

    if (!records) {
        throw new InvalidRequest(404, `Resource not found, resource id: ${id}.`);
    }

    const bids: ResponseBids[] = await _getBidsByUserBidderModels(records);

    return bids;
};

export const _getBidsByUserBidderModels = async (records: BidType[]) => {
    const bidderUsers: UsersCacheType = {};
    const adUsers: UsersCacheType = {};
    const bids: ResponseBids[] = [];

    for (let i = 0; i < records.length; i++) {
        const record: BidType = records[i];

        const {addUserId, bidderUserId} = record;

        const addUserIdString = addUserId.toString();
        const bidderUserIdString = bidderUserId.toString();

        if (!_.has(bidderUsers, bidderUserIdString)) {
            // eslint-disable-next-line no-await-in-loop
            const bidUser:UserType|null = await User.findById(bidderUserId).select('-password').lean();

            // @ts-ignore
            bidderUsers[bidderUserIdString] = bidUser;
        }

        if (!_.has(adUsers, addUserIdString)) {
            // eslint-disable-next-line no-await-in-loop
            const adUser:UserType|null = await User.findById(addUserId).select('-password').lean();

            // @ts-ignore
            adUsers[addUserIdString] = adUser;
        }

        const bid: ResponseBids = {
            ...record,
            bidderUser: bidderUsers[bidderUserIdString],
            adUser: adUsers[addUserIdString],
        };

        bids.push(bid);
    }

    return bids;
};

export {
    getBidsByUserBidder,
    getBidsByUserAd,
};
