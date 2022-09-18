import request from 'supertest';
import app from './../../app';
import {Image} from './../../models/image';
import jwt from 'jsonwebtoken';

describe('Test get image', () => {
    test('It should respond missing param', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        const res = await request(app)
            .get('/v1/getImage')
            .set({authorization: 'test 123'})
            .expect(422);

        expect(res.body.error).toBe(true);
        expect(res.body.message).toBe('\'id\' is required.');
    });

    test('Get image', async () => {
        jest.spyOn(Image, 'findById').mockReturnValue({
            image: {
                data: '312321312',
                contentType: 'image/png',
            },
        } as any);
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        await request(app)
            .get('/v1/getImage')
            .set({authorization: 'test 123'})
            .query({
                id: '312312',
            })
            .expect(200);
    });
});
