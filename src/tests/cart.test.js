request = require('supertest');
const app = require('../app');
const Game = require('../models/game');
require('../models');

let token;
let cartId;

beforeAll(async () => {
    const userLogin = {
        email: "testuser@gmail.com",
        password: "testuser1234"
    }
    const res = await request(app).post('/users/login').send(userLogin);
    token = res.body.token;
})

test('POST / cart_user', async () => {
    const game = await Game.create({
        title: 'titleTest',
        description: 'descriptionTest',
        company: 'companyTest',
        price: 50,
    });
    const cart = {
        gameId: game.id,
        quantity: 2
    };
    const res = await request(app)
        .post('/cart_user')
        .send(cart)
        .set('Authorization', `Bearer ${token}`);
    await game.destroy();
    cartId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET / cart_user', async () => {
    const res = await request(app)
        .get('/cart_user')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT / cart_user/:id', async () => {
    const cart = {
        quantity: 5
    };
    const res = await request(app)
        .put(`/cart_user/${cartId}`)
        .send(cart)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(cart.quantity);
});

test('DELETE / cart_user/:id', async () => {
    const res = await request(app)
    .delete(`/cart_user/${cartId}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});