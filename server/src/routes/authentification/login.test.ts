import request from 'supertest';
import app from './../../app';
import {User} from '../../models/user';
import {UserToken} from '../../models/userToken';
import * as bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import SedoConfig from '../../config/config';

describe('Test Login', () => {
    test('It should respond credentials are mandatory', async () => {
        const res = await request(app)
            .post('/v1/login')
            .send({test: 'lalal'})
            .expect(400);

        expect(res.body.error).toBe(true);
        expect(res.body.message).toBe('email/password are mandatory');
    });

    test('It should respond invalid credentials', async () => {
        jest.spyOn(User, 'findOne').mockReturnValue({
            password: 'pass',
        } as any);

        jest.spyOn(UserToken, 'findOne').mockReturnValue(null as any);
        jest.spyOn(UserToken, 'create').mockReturnValue(null as any);
        jest.spyOn(jwt, 'sign').mockReturnValue('token' as any);

        const res = await request(app)
            .post('/v1/login')
            .send({
                email: 'gigel',
                password: 'lalal',
            })
            .expect(400);

        expect(res.body.error).toBe(true);
        expect(res.body.message).toBe('Numele de utilizator sau parola introdusă este incorectă');
    });

    test('It should respond credentials are mandatory', async () => {
        const password = await bcryptjs.hash('password', 11);

        jest.spyOn(UserToken, 'findOne').mockReturnValue(null as any);
        jest.spyOn(UserToken, 'create').mockReturnValue(null as any);
        jest.spyOn(jwt, 'sign').mockReturnValue('token' as any);
        jest.spyOn(User, 'findOne').mockReturnValue({
            firstName: 'firstName',
            lastName: 'lastName',
            phone: 'phone',
            profilePic: 'profilePic',
            skills: 'skills',
            email: 'email',
            type: 'type',
            rating: 'rating',
            password,
            id: 'id',
        } as any);

        const res = await request(app)
            .post('/v1/login')
            .send({
                email: 'gigel',
                password: 'password',
            })
            .expect(200);

        const expectedUser = {
            firstName: 'firstName',
            lastName: 'lastName',
            phone: 'phone',
            profilePic: 'profilePic',
            skills: 'skills',
            email: 'email',
            type: 'type',
            rating: 'rating',
            id: 'id',
            expiresIn: SedoConfig.AccessTokenExpiresInSeconds,
            password: '',
            token: 'token',
            refreshToken: 'token',
        };

        expect(res.body.error).toBe(false);
        expect(res.body.user).toStrictEqual(expectedUser);
    });
});
