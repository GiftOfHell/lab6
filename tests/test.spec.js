const request = require('supertest');
const server = require('../index')
const mongoose = require('mongoose')
const orderService = require("../db.js");

const TEST_ORDER = {
    name: 'test',
    description: 'test description',
    price: 5,
};

const createTestOrder = async () => {
    const order = new orderService(TEST_ORDER);
    return order.save();
}


describe("Orders", () => {
    afterAll(async() => {
        await mongoose.connection.close()
    })

    test('[GET] /', async () => {
        await request(server)
            .get('/orders')
            .expect(200)
            .then(({ body }) => {
                if (body.length) {
                    expect(body[0]).toContainAllKeys(['_id', 'name', 'description', 'price', '__v']);
                }
            });
    });

    test('[POST]', async () => {
        await request(server)
            .post('/orders')
            .send(TEST_ORDER)
            .expect(201)
            .then(({ body }) => {
                expect(body).toContainAllKeys(['_id', 'name', 'description', 'price', '__v']);
            });
    });

    test('[DELETE]', async () => {
        const created = await createTestOrder()

        await request(server)
            .delete(`/orders/${created._id}`)
            .expect(200)
            .then(({ body }) => {
                expect(body).toContainAllKeys(['_id', 'name', 'description', 'price', '__v']);
            });
    });
})