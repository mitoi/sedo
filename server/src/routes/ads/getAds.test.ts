import request from 'supertest';
import app from './../../app';
import {Ad} from '../../models/ad';
import jwt from 'jsonwebtoken';

describe('Test Get Ads', () => {
    test('It should respond that max limit exceeded', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        const resp = await request(app)
            .get('/v1/ad/list')
            .set({authorization: 'test 123'})
            .query({
                limit: 51,
            })
            .expect(403);

        expect(resp.body.error).toBe(true);
        expect(resp.body.message).toBe('Max limit exceeded, 50 max limit.');
    });

    test('It should respond invalid limit', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        const resp = await request(app)
            .get('/v1/ad/list')
            .set({authorization: 'test 123'})
            .query({
                limit: 'ab',
            })
            .expect(422);

        expect(resp.body.error).toBe(true);
        expect(resp.body.message).toBe('Invalid limit.');
    });

    test('It should respond invalid sortDir', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        const resp = await request(app)
            .get('/v1/ad/list')
            .set({authorization: 'test 123'})
            .query({
                sortDir: 'up',
            })
            .expect(422);

        expect(resp.body.error).toBe(true);
        expect(resp.body.message).toBe('Invalid sortDir.');
    });

    test('It should respond with ads', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        const userData = [{
            _id: '631f7dc02d49855dbe650c02',
            title: 'title',
            description: 'description',
            photos: [
                {
                    id: '1234',
                    position: '0',
                },
                {
                    id: '321321321',
                    position: '1',
                },
            ],
            userId: '63135a11882f43deb6368677',
            type: 'seller',
            category: 'category',
            price: '1231344.321321321',
            __v: 0,
        }];

        jest.spyOn(Ad, 'find').mockReturnValue({
            sort() {
                return {
                    skip() {
                        return {
                            limit() {
                                return userData;
                            },
                        };
                    },
                };
            },
        } as any);

        const resp = await request(app)
            .get('/v1/ad/list')
            .set({authorization: 'test 123'})
            .expect(200);

        expect(resp.body.error).toBe(false);
        expect(resp.body.records).toStrictEqual(userData);
    });
});
