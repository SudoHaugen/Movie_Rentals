const { Rental } = require('../../models/rentals');
const mongoose = require('mongoose');
let server;
let customerId;
let movieId;
let rental;

describe('/api/returns', () => {
    beforeEach(async () => {
        server = require('../../index');
        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyrentalRate: 2
            }
        });
        await rental.save();
    });
    afterEach(async () => {
        await Rental.remove({}); //removes all entries in database
        server.close();
    });

    it('should work!', async () => {
        const result = await Rental.findById(rental._id);
        expect(result).not.toBeNull();
    });
});