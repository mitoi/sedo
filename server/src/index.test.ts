import request from 'supertest';
import app from './app';

describe('Test the middleware for authentification', () => {
    test('It should respond that user is not authorized', async () => {
        const res = await request(app).post('/v1/ad');

        expect(res.statusCode).toEqual(401);

        expect(res.body).toEqual({
            error: true,
            message: 'User is not authorized.',
        });
    });
});
