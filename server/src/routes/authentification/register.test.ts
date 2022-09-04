import request from 'supertest';
import app from "./../../app";
import {User} from '../../models/user';
import bcrypt from 'bcryptjs';

describe('Test User Register', () => {
    test('It should respond missing param', async () => {
        const res = await request(app)
                .post('/v1/register')
                .send({
                    firstName: 'johnny',
                    lastName: 'marinas',
                })
                .expect(400);

        expect(res.body.error).toBe(true);
        expect(res.body.message).toBe(
            'Missing fields. Required fields: firstName, lastName, phone, email, type, passsword.'
        );
    });

    test('User already exists', async () => {
        jest.spyOn(User, 'findOne').mockReturnValue({
            firstName: 'test',
        } as any);

        const res = await request(app)
                .post('/v1/register')
                .send({
                    firstName: 'johnny',
                    lastName: 'marinas',
                    phone: '1231321',
                    email: 'gigel@gmail.com',
                    type: 'normal',
                    password: '123',
                })
                .expect(409);

        expect(res.body.error).toBe(true);
        expect(res.body.message).toBe('User already exists.');
    });

    test('It should respong with the new token.', async () => {
        jest.spyOn(bcrypt, 'hash').mockReturnValue('encryptedPasswor' as any);
        jest.spyOn(User, 'findOne').mockReturnValue(null as any);
        jest.spyOn(User, 'create').mockReturnValue(null as any);

        const res = await request(app)
                .post('/v1/register')
                .send({
                    firstName: 'johnny',
                    lastName: 'marinas',
                    phone: '1231321',
                    email: 'gigel@gmail.com',
                    type: 'normal',
                    password: '123',
                })
                .expect(201);

        expect(res.body.error).toBe(false);
        expect(res.body.message).toStrictEqual('User created successfully.');
    });
});