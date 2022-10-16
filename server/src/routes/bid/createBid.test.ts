import request from 'supertest';
import app from './../../app';
import jwt from 'jsonwebtoken';
import {User} from '../../models/user';
import {Bid} from '../../models/bid';

describe('Test create Bid', () => {
    test('It should respond invalid ID', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        const fakeAdId = '123-456';

        const resp = await request(app)
            .post(`/v1/bid/${fakeAdId}`)
            .set({authorization: 'test 123'})
            .send({
                title: 'test',
                description: 'test description',
            });

        expect(resp.body.error).toBe(true);
        expect(resp.body.message).toBe(`Invalid Ad Id, '${fakeAdId}`);
        expect(resp.status).toBe(409);
    });

    test('It should respond invalid body fields', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        const fakeAdId = '6325d006d385db885810fdc6';

        const resp = await request(app)
            .post(`/v1/bid/${fakeAdId}`)
            .set({authorization: 'test 123'})
            .send({
                test: '123',
                description: 'test description',
            });

        expect(resp.body.error).toBe(true);
        expect(resp.body.message).toBe('Invalid \'bidderUserId\' field, value:\'undefined\'');
        expect(resp.status).toBe(422);
    });

    test('It should respond successfully', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        jest.spyOn(User, 'findById').mockReturnValue({
            id: 'addId',
        } as any);

        jest.spyOn(Bid, 'create').mockReturnValue({
            id: 'addId',
        } as any);

        const fakeAdId = '6325d006d385db885810fdc6';

        const resp = await request(app)
            .post(`/v1/bid/${fakeAdId}`)
            .set({authorization: 'test 123'})
            .send({
                title: 'test',
                description: 'test description',
                bidderUserId: '621f7dc02d49855dbe650c02',
            });

        expect(resp.body.error).toBe(false);
        expect(resp.body.id).toBe('addId');
        expect(resp.status).toBe(201);
    });
});
