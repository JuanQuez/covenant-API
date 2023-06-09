request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');
const GameImg = require('../models/GameImg');
require('../models')

let gameId;
let token

beforeAll(async () => {
    const userLogin = {
        email: "testuser@gmail.com",
        password: "testuser1234"
    }
    const res = await request(app).post('/users/login').send(userLogin);
    token = res.body.token;
})

test('POST / games', async () => {
    const category = await Category.create({ name: "Rol" });
    const game = {
        title: 'NameGame',
        description: 'game description',
        price: 50,
        company: "nameCompany",
        categoryId: category.id 
    };
    const res = await request(app)
        .post('/games')
        .send(game)
        .set('Authorization', `Bearer ${token}`);
    await category.destroy();
    gameId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET / games', async () => {
    const res = await request(app).get('/games');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT / games/:id', async () => {
    const gameUpdate = {
        title: 'game updated'
    }
    const res = await request(app)
        .put(`/games/${gameId}`)
        .send(gameUpdate)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(gameUpdate.title);
});

//////? TEST SET / GAMES-IMAGES ////////

test('POST / games/:id/images', async () => {
    const image = await GameImg.create({
        url: "https://urlrandomtest.com",
        publicId: "testId"
    })
    const res = await request(app)
        .post(`/games/${gameId}/images`)
        .send([image.id])
        .set('Authorization', `Bearer ${token}`);
    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('DELETE / games/:id', async () => {
    const res = await request(app).delete(`/games/${gameId}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});