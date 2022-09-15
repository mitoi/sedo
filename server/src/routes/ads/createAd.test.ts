import request from 'supertest';
import app from "./../../app";
import {Ad} from '../../models/ad';
import jwt from 'jsonwebtoken';

describe('Test Create Ad', () => {
    test('It should respond missing param', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        const resp = await request(app)
            .post('/v1/ad')
            .set({'authorization': 'test 123'})
            .send({
                title: 'test',
                description: 'test description',
            });

        expect(resp.body.error).toBe(true);
        expect(resp.body.message)
            .toBe('Missing fields. Required fields: title, description, category, userId, type, price.');
        expect(resp.status).toBe(400);
    });

    test('It should respond successfully', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        jest.spyOn(Ad, 'create').mockReturnValue({
            id: 'addId',
        } as any);

        const resp = await request(app)
            .post('/v1/ad')
            .set({'authorization': 'test 123'})
            .send({
                title: 'test',
                description: 'test description',
                userId: '621f7dc02d49855dbe650c02',
                type: 'ad',
                category: 'cars',
                price: '1132.3',
            });

        expect(resp.body.error).toBe(false);
        expect(resp.body.id).toBe('addId');
        expect(resp.status).toBe(201);
    })
});
