import request from 'supertest';
import app from './../../app';
import {Ad} from '../../models/ad';
import jwt from 'jsonwebtoken';
import {Bid} from '../../models/bid';
import * as getBid from './getBid';

describe('Test Get Bid', () => {
    beforeEach(() => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);
    });

    test('It should respond that id is invalid', async () => {
        jest.spyOn(Ad, 'findById').mockReturnValue(false as any);

        const bidId = '4444444';

        const resp = await request(app)
            .get(`/v1/bid/${bidId}`)
            .set({authorization: 'test 123'})
            .expect(409);

        expect(resp.body.error).toBe(true);
        expect(resp.body.message).toBe(`Invalid Id, '${bidId}'.`);
    });

    test('It should respond with an object', async () => {
        const returnData = {
            bidderUserId: '621f7dc02d49855dbe650c33',
            addUserId: '651f7dc02d49855dbe650c33',
            adId: '621f7dc02d49855dbe650c08',
            price: 123,
            description: 'test',
            type: 'client',
            category: 'test',
        };

        Bid.findById = jest.fn().mockImplementationOnce(() => ({lean: jest.fn().mockResolvedValueOnce(returnData)}));

        jest.spyOn(getBid, '_getDetailedBid').mockReturnValueOnce(returnData as any);

        const bidId = '621f7dc02d49855dbe650c08';

        const resp = await request(app)
            .get(`/v1/bid/${bidId}`)
            .set({authorization: 'test 123'})
            .query({
                id: bidId,
            })
            .expect(200);

        expect(resp.body.error).toBe(false);
        expect(resp.body.record).toStrictEqual(returnData);
    });
});
