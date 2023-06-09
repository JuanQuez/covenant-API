request = require('supertest');
const app = require('../app');

let userId;
let token;

test('POST / users', async () => {
    const user = {
        firstName: "Juan",
        lastName: "Bohórquez",
        email: "juanquez.dev@gmail.com",
        password: "juancho1234",
        phone: "3205268409"
    };
    const res = await request(app)
        .post('/users')
        .send(user);
    userId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

//////////? TEST LOGIN USER TOKEN //////////

test('POST / users/login', async () => {
    const credentials = {
        email: "juanquez.dev@gmail.com",
        password: "juancho1234"
    };
    const res = await request(app)
        .post('/users/login')
        .send(credentials);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined()
});


test('POST / users/login', async () => {
    const credentials = {
        email: "wrongUser",
        password: "wrongPass"
    };
    const res = await request(app)
        .post('/users/login')
        .send(credentials);
    expect(res.status).toBe(401);
});

//////////////////////////////////////?

test('GET / users', async () => {
    const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
});

test('PUT / users/:id', async () => {
    const userUpdate = {
        firstName: 'Juan Update'
    }
    const res = await request(app)
        .put(`/users/${userId}`)
        .send(userUpdate)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(userUpdate.firstName);
});

test('DELETE / users/:id', async () => {
    const res = await request(app)
        .delete(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
