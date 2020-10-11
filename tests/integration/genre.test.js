const mongoose = require('mongoose');
const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
let server;

describe('/api/genres', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(async () => {
        await Genre.remove({}); //removes all entries in database
        server.close();
    });
    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ]);

            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
        });
    }),
        describe('GET /:id', () => {
            it('should return if valid id is passed', async () => {
                const genre = new Genre({ name: 'genre1' });
                genre.save();

                const res = await request(server).get('/api/genres/' + genre._id);
                expect(res.status).toBe(200);
                expect(res.body).toHaveProperty('name', genre.name);
            }, 10000);
            it('should return 404 if invalid id is passed', async () => {
                const res = await request(server).get('/api/genres/1');

                expect(res.status).toBe(404);
            }, 10000),
                it('should return 404 if no genre with the given id exists', async () => {
                    const id = mongoose.Types.ObjectId();
                    const res = await request(server).get('/api/genres/' + id);

                    expect(res.status).toBe(404);
                }, 10000);
        });
    describe('POST /', () => {


        /**
         * Define the happy path, and then in each test, we change one paramter that clearly aligns with the name of the test
         */

        let token;
        let name;

        const execute = async () => {
            return await request(server)
                .post('/api/genres/')
                .set('x-auth-token', token)
                .send({ name: name });
        };

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'genre1';
        });


        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await execute();

            expect(res.status).toBe(401);
        });
        it('should return 400 if genre is less than 5 characters', async () => {
            name = '1234';
            const res = await execute();

            expect(res.status).toBe(400);
        }, 10000);
        it('should return 400 if genre is more than 50 characters', async () => {
            name = new Array(52).join('a');
            const res = await execute();

            expect(res.status).toBe(400);
        }, 10000);
        it('should save the genre if it is valid', async () => {
            await execute();
            const genre = await Genre.find({ name: 'genre1 ' });

            expect(genre).not.toBeNull();
        }, 10000);
        it('should return the genre if it is valid', async () => {
            const res = await execute();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        }, 10000);
    });
});


describe('auth middleware', () => {
    let token;

    beforeEach(() => {
        server = require('../../index');
        token = new User().generateAuthToken();
    });
    afterEach(async () => {
        await Genre.remove({});
        server.close();
    });

    const execute = () => {
        return request(server)
            .post('/api/genres/')
            .set('x-auth-token', token)
            .send({ name: 'genre1' });
    }
    it('should return 401 if no token is provided', async () => {
        token = '';
        const res = await execute();

        expect(res.status).toBe(401);
    }),
        it('should return 400 if token is invalid', async () => {
            token = 'a';

            const res = await execute();

            expect(res.status).toBe(400);
        }),
        it('should return 200 if token is valid', async () => {
            const res = await execute();

            expect(res.status).toBe(200);
        });
});