import {Request, Response} from 'express';
import {Ad, AdType} from '../../models/ad';
import { User, UserType } from '../../models/user';

interface sortType {
    [key: string]: number,
}

interface filterType {
    category?: string,
    title?: any,
    description?: any,
    userId?: string,
}

const getAds = async (req: Request, res: Response) => {
    let {
        title,
        category,
        startPosition,
        limit,
        sortDir,
        orderBy,
        userId,
    } = req.query;

    if (!sortDir) {
        sortDir = 'd';
    } else if (sortDir !== 'a' && sortDir !== 'd') {
        res.status(422).json({
            error: true,
            message: 'Invalid sortDir.',
        });

        return;
    }

    const listSortDir = sortDir === 'a' ? 1 : -1;

    if (!orderBy) {
        orderBy = 'updatedAt';
    }

    if (startPosition && typeof startPosition === 'string' && isNaN(parseInt(startPosition, 10))) {
        res.status(422).json({
            error: true,
            message: 'Invalid start position.',
        });

        return;
    }

    const listStartPosition = typeof startPosition === 'string' ? parseInt(startPosition, 10) : 0;

    if (limit && typeof limit === 'string' && isNaN(parseInt(limit, 10))) {
        res.status(422).json({
            error: true,
            message: 'Invalid limit.',
        });

        return;
    }

    if (category && typeof category !== 'string') {
        res.status(422).json({
            error: true,
            message: 'Invalid category.',
        });

        return;
    }

    if (title && typeof title !== 'string') {
        res.status(422).json({
            error: true,
            message: 'Invalid title.',
        });

        return;
    }

    if (userId && typeof userId !== 'string') {
        res.status(422).json({
            error: true,
            message: 'Invalid user id.',
        });

        return;
    }

    if (typeof orderBy !== 'string') {
        res.status(422).json({
            error: true,
            message: 'Invalid orderBy.',
        });

        return;
    }

    if (!limit) {
        limit = '25';
    } else if (typeof limit === 'string' && parseInt(limit, 10) > 50) {
        res.status(403).json({
            error: true,
            message: 'Max limit exceeded, 50 max limit.',
        });

        return;
    }

    if (typeof limit !== 'string') {
        res.status(422).json({
            error: true,
            message: 'Invalid limit.',
        });

        return;
    }

    const listLimit:number = parseInt(limit, 10);
    const sort:sortType = {};
    sort[orderBy] = listSortDir;

    const filter: filterType = {};

    if (category) {
        filter.category = category;
    }

    if (title) {
        filter.title = {$regex: `.*${title}.*`};
    }

    if (userId) {
        filter.userId = userId;
    }

    const records: AdType[]|null = await Ad
        .find(filter)
        .sort(sort)
        .skip(listStartPosition)
        .limit(listLimit);

    // we need user firstName and lasName    
    for (let record of records) {
        const userInfo: UserType|null = await User.findById(record.userId).select("firstName, lastName");
        record.user = userInfo;
    }

    res.status(200).json({
        error: false,
        length: records.length,
        records,
    });
};

export {
    getAds,
};
