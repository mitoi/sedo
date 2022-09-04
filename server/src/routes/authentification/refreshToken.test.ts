import request from "supertest";
import app from "./../../app";
import {User} from '../../models/user';
import {UserToken} from '../../models/userToken';
import jwt from 'jsonwebtoken';

describe("Test Refresh Token", () => {
    test('It should respond missing param', async () => {
        const res = await request(app)
                .post('/v1/generateNewToken')
                .send({test: "lalal"})
                .expect(400);

        expect(res.body.error).toBe(true);
        expect(res.body.message).toBe('refreshToken parameter is missing.');
    });

    test('Error parameter type', async () => {
        const res = await request(app)
                .post('/v1/generateNewToken')
                .send({refreshToken: 123})
                .expect(400);

        expect(res.body.error).toBe(true);
        expect(res.body.message).toBe('refreshToken should be string.');
    });

    test('It should respong with the new token.', async () => {
        jest.spyOn(UserToken, 'findOne').mockReturnValue('123' as any);
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);
        jest.spyOn(User, 'findById').mockReturnValue({
            email: 'email',
            id: 'id',
        } as any);

        const res = await request(app)
                .post('/v1/generateNewToken')
                .send({
                    refreshToken: 'abc',
                })
                .expect(201);

        expect(res.body.error).toBe(false);
        expect(res.body.accessToken).not.toBeUndefined();
        expect(res.body.message).toStrictEqual('Access token created successfully.');
    });
});