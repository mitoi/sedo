import request from 'supertest';
import app from './../../app';
import {Ad} from '../../models/ad';
import jwt from 'jsonwebtoken';
import {Bid} from '../../models/bid';

describe('Test Get Bids', () => {
    beforeEach(() => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);
    });

    test('It should respond that id is invalid', async () => {
        jest.spyOn(Ad, 'findById').mockReturnValue(false as any);

        const adId = '12345';

        const resp = await request(app)
            .get(`/v1/ad/${adId}/bids`)
            .set({authorization: 'test 123'})
            .expect(409);

        expect(resp.body.error).toBe(true);
        expect(resp.body.message).toBe(`Invalid adId, '${adId}'.`);
    });

    test('It should respond with an array', async () => {
        const returnData = [
            {
                _id: '634be62c8e1a167fbc2ac172',
                adId: '621f7dc02d49855dbe650c06',
                bidderUserId: '63398bcaa0a1c6042261a17a',
                description: 'test',
                createdAt: '2022-10-16T11:08:28.689Z',
                updatedAt: '2022-10-16T11:08:28.689Z',
                bidderUser: {
                    _id: '63398bcaa0a1c6042261a17a',
                    firstName: 'terry',
                    lastName: 'dsadsa',
                    phone: '0760183832',
                    skills: [],
                    email: 'terryureche@gmail.com',
                    type: 'client',
                    rating: '0',
                    createdAt: '2022-10-02T13:02:02.601Z',
                    updatedAt: '2022-10-02T13:02:02.601Z',
                },
            },
        ];

        const leanData = [
            {
                _id: '634be62c8e1a167fbc2ac172',
                adId: '621f7dc02d49855dbe650c06',
                bidderUserId: {
                    _id: '63398bcaa0a1c6042261a17a',
                    firstName: 'terry',
                    lastName: 'dsadsa',
                    phone: '0760183832',
                    skills: [],
                    email: 'terryureche@gmail.com',
                    type: 'client',
                    rating: '0',
                    createdAt: '2022-10-02T13:02:02.601Z',
                    updatedAt: '2022-10-02T13:02:02.601Z',
                },
                description: 'test',
                createdAt: '2022-10-16T11:08:28.689Z',
                updatedAt: '2022-10-16T11:08:28.689Z',
            },
        ];

        Bid.find = jest.fn().mockImplementationOnce(() => ({
            sort: jest.fn().mockImplementationOnce(() => ({
                // eslint-disable-next-line max-nested-callbacks
                populate: jest.fn().mockImplementationOnce(() => ({
                    lean: jest.fn().mockResolvedValueOnce(leanData),
                })),
            })),
        }));

        const adId = '621f7dc02d49855dbe650c06';

        const resp = await request(app)
            .get(`/v1/ad/${adId}/bids`)
            .set({authorization: 'test 123'})
            .query({
                id: adId,
            })
            .expect(200);

        expect(resp.body.error).toBe(false);
        expect(resp.body.records).toStrictEqual(returnData);
    });
});
