import request from 'supertest';
import app from '../../app';
import jwt from 'jsonwebtoken';
import {User} from '../../models/user';

describe('Test Update User Info', () => {
    test('It should respond invalid id', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        const id = '321312';

        const resp = await request(app)
            .put(`/v1/user/${id}`)
            .set({authorization: 'test 123'});

        expect(resp.body.error).toBe(true);
        expect(resp.body.message).toBe(`Invalid Id, '${id}'.`);
        expect(resp.status).toBe(409);
    });

    test('It should respond user not found.', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);
        jest.spyOn(User, 'findById').mockReturnValue(null as any);

        const id = '621f7dc02d49855dbe650c06';

        const resp = await request(app)
            .put(`/v1/user/${id}`)
            .set({authorization: 'test 123'});

        expect(resp.body.error).toBe(true);
        expect(resp.body.message).toBe(`User not found: ${id}.`);
        expect(resp.status).toBe(404);
    });
    //
    test('It should respond successfully', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        const user = {
            firstName: 'firstName',
            lastName: 'lastName',
            phone: 'phone',
            profilePic: 'profilePic',
            skills: 'skills',
            email: 'email',
            type: 'type',
            rating: 'rating',
            id: 'id',
        };

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
        };

        const id = '621f7dc02d49855dbe650c06';

        jest.spyOn(User, 'findById').mockReturnValue(user as any);
        jest.spyOn(User, 'findByIdAndUpdate').mockReturnValue(expectedUser as any);

        const resp = await request(app)
            .put(`/v1/user/${id}`)
            .set({authorization: 'test 123'})
            .send({
                lastName: 'updatedLastName',
            });

        expect(resp.body.error).toBe(false);
        expect(resp.body.user).toStrictEqual(expectedUser);
        expect(resp.status).toBe(200);
    });
});
