import request from "supertest";
import app from "./../../app";
import {UserToken} from '../../models/userToken';

describe("Test logout function", () => {
    test('It should respond Logged Out Successfully', async () => {
        jest.spyOn(UserToken, 'findOne').mockReturnValue(null as any);

        const res = await request(app)
                .del('/v1/logout')
                .send({refreshToken: "lalal"})
                .expect(200);

        expect(res.body.message).toBe('Logged Out Successfully');
    })
});