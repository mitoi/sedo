import request from 'supertest';
import app from './../../app';
import {Ad} from '../../models/ad';
import jwt from 'jsonwebtoken';

describe('Test Get Ad', () => {
    test('It should respond that id is missing', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        const resp = await request(app)
            .get('/v1/ad')
            .set({'authorization': 'test 123'})
            .expect(422);

            expect(resp.body.error).toBe(true);
            expect(resp.body.message).toBe(`Id is missing.`);
    });

    test('It should respond that id is missing', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        jest.spyOn(Ad, 'findById').mockReturnValue(false as any);

        const adId = '621f7dc02d49855dbe650c06';

        const resp = await request(app)
            .get('/v1/ad')
            .set({'authorization': 'test 123'})
            .query({
                id: adId,
            })
            .expect(404);

            expect(resp.body.error).toBe(true);
            expect(resp.body.message).toBe(`Resource not found, resource id: ${adId}.`);
    });

    test('It should respond that id is invalid', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        jest.spyOn(Ad, 'findById').mockReturnValue(false as any);

        const adId = '12345';

        const resp = await request(app)
            .get('/v1/ad')
            .set({'authorization': 'test 123'})
            .query({
                id: adId,
            })
            .expect(409);

            expect(resp.body.error).toBe(true);
            expect(resp.body.message).toBe(`Invalid Id, '${adId}'.`);
    });

    test('It should respond with ad details', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        const userData = {
            '_id': '631f7dc02d49855dbe650c02',
            'title': 'title',
            'description': 'description',
            'photos': [
                {
                    'id': '1234',
                    'position': '0'
                },
                {
                    'id': '321321321',
                    'position': '1'
                }
            ],
            'userId': '63135a11882f43deb6368677',
            'type': 'seller',
            'category': 'category',
            'price': '1231344.321321321',
            '__v': 0
        };

        jest.spyOn(Ad, 'findById').mockReturnValue(userData as any);

        const adId = '621f7dc02d49855dbe650c06';

        const resp = await request(app)
            .get('/v1/ad')
            .set({'authorization': 'test 123'})
            .query({
                id: adId,
            })
            .expect(200);

            expect(resp.body.error).toBe(false);
            expect(resp.body.record).toStrictEqual(userData);
    });
});
