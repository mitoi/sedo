import request from 'supertest';
import app from './../../app';
import {Ad} from '../../models/ad';
import jwt from 'jsonwebtoken';
import {Bid} from '../../models/bid';
import * as getBids from './getBids';

describe('Test Get Bids', () => {
    beforeEach(() => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);
    });

    test('It should respond that id is invalid', async () => {
        jest.spyOn(Ad, 'findById').mockReturnValue(false as any);

        const userBidderId = '12345';

        const resp = await request(app)
            .get(`/v1/bids/byUserBidder/${userBidderId}`)
            .set({authorization: 'test 123'})
            .expect(409);

        expect(resp.body.error).toBe(true);
        expect(resp.body.message).toBe(`Invalid Id, '${userBidderId}'.`);
    });

    test('It should respond with an array', async () => {
        const returnData = [
            {
                bidderUserId: '621f7dc02d49855dbe650c33',
                addUserId: '651f7dc02d49855dbe650c33',
                adId: '621f7dc02d49855dbe650c06',
                price: 123,
                description: 'test',
                type: 'client',
                category: 'test',
            },
        ];

        Bid.find = jest.fn().mockImplementationOnce(() => ({lean: jest.fn().mockResolvedValueOnce(returnData)}));

        jest.spyOn(getBids, '_getBidsByUserBidderModels').mockReturnValueOnce(returnData as any);

        const adId = '621f7dc02d49855dbe650c06';

        const resp = await request(app)
            .get(`/v1/bids/byUserBidder/${adId}`)
            .set({authorization: 'test 123'})
            .query({
                id: adId,
            })
            .expect(200);

        expect(resp.body.error).toBe(false);
        expect(resp.body.records).toStrictEqual(returnData);
    });

    test('It should respond with an array', async () => {
        const returnData = [
            {
                bidderUserId: '621f7dc02d49855dbe650c33',
                addUserId: '651f7dc02d49855dbe650c33',
                adId: '621f7dc02d49855dbe650c04',
                price: 123,
                description: 'test',
                type: 'client',
                category: 'test',
            },
        ];

        Bid.find = jest.fn().mockImplementationOnce(() => ({lean: jest.fn().mockResolvedValueOnce(returnData)}));

        jest.spyOn(getBids, '_getBidsByUserBidderModels').mockReturnValueOnce(returnData as any);

        const adId = '621f7dc02d49855dbe650c04';

        const resp = await request(app)
            .get(`/v1/bids/byUserAd/${adId}`)
            .set({authorization: 'test 123'})
            .query({
                id: adId,
            })
            .expect(200);

        expect(resp.body.error).toBe(false);
        expect(resp.body.records).toStrictEqual(returnData);
    });
});
