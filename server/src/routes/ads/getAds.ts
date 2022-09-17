import {Request, Response} from 'express';
import {Ad, AdType} from '../../models/ad';

interface sortType {
    [key: string]: number,
}

interface categoryType {
    category?: string,
}

const getAds = async (req: Request, res: Response) => {
    let {
        category,
        startPosition,
        limit,
        sortDir,
        orderBy,
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

    const filter: categoryType = {};

    if (category) {
        filter.category = category;
    }

    const records: AdType[]|null = await Ad
        .find(filter)
        .sort(sort)
        .skip(listStartPosition)
        .limit(listLimit);

    res.status(200).json({
        error: false,
        length: records.length,
        records,
    });
};

export {
    getAds,
};
