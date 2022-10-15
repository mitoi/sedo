import request from 'supertest';
import app from './../../app';
import {Image} from './../../models/image';
import jwt from 'jsonwebtoken';

describe('Test get image', () => {
    test('It should respond missing param', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);
        
        const id = '123';

        const res = await request(app)
            .get(`/v1/getImage`)
            .set({authorization: 'test 123'})
            .expect(404);
    });
});
