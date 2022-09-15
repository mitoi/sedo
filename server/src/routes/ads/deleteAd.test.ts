import request from 'supertest';
import app from './../../app';
import {Ad} from '../../models/ad';
import jwt from 'jsonwebtoken';

describe('Test Delete Ad', () => {
    test('It should respond that id is missing', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        const resp = await request(app)
            .delete('/v1/ad')
            .set({'authorization': 'test 123'})
            .expect(422);

            expect(resp.body.error).toBe(true);
            expect(resp.body.message).toBe(`Id is missing.`);
    });

    test('It should respond that id is invalid', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        const adId = '12345';

        const resp = await request(app)
            .delete('/v1/ad')
            .set({'authorization': 'test 123'})
            .query({
                id: adId,
            })
            .expect(409);

            expect(resp.body.error).toBe(true);
            expect(resp.body.message).toBe(`Invalid Id, '${adId}'.`);
    });

    test('It should respond that resource was not found', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        jest.spyOn(Ad, 'findByIdAndDelete').mockReturnValue(false as any);

        const adId = '631f7dc02d49855dbe650c01';

        const resp = await request(app)
            .delete('/v1/ad')
            .set({'authorization': 'test 123'})
            .query({
                id: adId,
            })
            .expect(404);

            expect(resp.body.error).toBe(true);
            expect(resp.body.message).toBe(`Resource not found, resource id: '${adId}'.`);
    });

    test('It should respond with ad details', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        jest.spyOn(Ad, 'findByIdAndDelete').mockReturnValue(true as any);

        const adId = '621f7dc02d49855dbe650c06';

        await request(app)
            .delete('/v1/ad')
            .set({'authorization': 'test 123'})
            .query({
                id: adId,
            })
            .expect(202);
    });
});
