import request from 'supertest';
import app from './../../app';
import jwt from 'jsonwebtoken';
import {readdirSync, unlinkSync} from 'fs';
import {Image} from './../../models/image';
import path from 'path';

describe('Test create image', () => {
    test('It should respond missing param', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        const res = await request(app)
                .post('/v1/upload/photo')
                .set({'authorization': 'test 123'})
                .expect(422);

        expect(res.body.error).toBe(true);
        expect(res.body.message).toBe(`File is missing.`);
    });

    test('Get image', async () => {
        jest.spyOn(Image, 'create').mockReturnValue({
            id: 'imageId',
        } as any);
        jest.spyOn(jwt, 'verify').mockReturnValue({
            id: '123',
        } as any);

        const buffer = Buffer.from('test data');

        const result = await request(app)
                .post('/v1/upload/photo')
                .set({'authorization': 'test 123'})
                .attach('image', buffer, 'testJestImageToBeDeleted.png')
                .expect(201);

        //cleanup
        const files = readdirSync(path.join(__dirname, '../../upload/images'));

        for(let i = 0; i < files.length; i++) {
            if (files[i].startsWith('testJestImageToBeDeleted')) {
                unlinkSync(path.join(__dirname, '../../upload/images', files[i]));
            }
        }

        expect(result.body.error).toBeFalsy();
        expect(result.body.imageId).toBe('imageId');
    });
});