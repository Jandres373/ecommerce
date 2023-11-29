import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken'; 
import User from '../models/user.model';
import '../models/index';
import dotenv from 'dotenv';

dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET || " ";
let token: any;

describe('User Controller', () => {
  async function getToken() {
    const user = await User.findOne({ where: { id: 1 } });
    return jwt.sign({ user }, TOKEN_SECRET, { expiresIn: '1d' });
  }

  beforeAll(async () => {
    token = await getToken();
  });

  it('should get all users', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    console.log(response.body);
    expect(response.status).toBe(200);
  });

  it('should create a new user', async () => {
    const newUser = { 
      firstName: 'John', 
      lastName: 'Doe', 
      email: 'john.doe@example.com', 
      password: 'password123', 
      phone: '123456789' 
    };

    const response = await request(app)
      .post('/users')
      .send(newUser);

    console.log(response.body);
    expect(response.status).toBe(201);
  });

  it('should delete a user', async () => {
    const newUserResponse = await request(app)
      .post('/users')
      .send({ 
        firstName: 'Paquita', 
        lastName: 'la del barrio', 
        email: 'paquita@sisas.com', 
        password: 'delete123', 
        phone: '987654321' 
      });

    const userId = newUserResponse.body.id;

    const response = await request(app)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it('should update a user', async () => {
    const newUserResponse = await request(app)
      .post('/users')
      .send({ 
        firstName: 'Karol', 
        lastName: 'G', 
        email: 'karolG@example.com', 
        password: 'update123', 
        phone: '111222333' 
      });

    const userId = newUserResponse.body.id;

    const updatedUser = { 
      firstName: 'Freddy', 
      lastName: 'mercury', 
      email: 'queen@example.com', 
      password: 'updated123', 
      phone: '999888777' 
    };

    const response = await request(app)
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedUser);

    console.log(response.body);
    expect(response.status).toBe(200);
  });

  it('should login a user', async () => {
    const userCredentials = { 
      email: 'john.doe@example.com', 
      password: 'password123' 
    };

    const response = await request(app)
      .post('/users/login')
      .send(userCredentials);

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
