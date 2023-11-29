import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken'; 
import User from '../models/user.model';
import '../models/index'
import dotenv from 'dotenv';
import sequelize from '../database/db_config';

dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET || " ";
let token: any;

describe('Cart Controller', () => {
  async function getToken() {
    const user = await User.findOne({ where: { id: 1 } });
    return jwt.sign({ user }, TOKEN_SECRET, { expiresIn: '1d' });
  }

  beforeAll(async () => {
    token = await getToken();
  });

  it('should get all cart items', async () => {
    const response = await request(app)
      .get('/cart')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('should get one cart item by ID', async () => {
    const newItemResponse = await request(app)
      .post('/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        userId: 1,
        productId: 1,
        quantity: 20
      });

    const cartItemId = newItemResponse.body.id;

    const response = await request(app)
      .get(`/cart/${cartItemId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('should add a new item to the cart', async () => {
    const newItem = { 
      userId: 1,
      productId: 1,
      quantity: 20
    };
    const response = await request(app)
      .post('/cart')
      .set('Authorization', `Bearer ${token}`)
      .send(newItem);
    expect(response.status).toBe(201);
  });

  it('should update item quantity in the cart by ID', async () => {
    const newItemResponse = await request(app)
      .post('/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        userId: 1,
        productId: 1,
        quantity: 1
      });

    const cartItemId = newItemResponse.body.id;

    const updatedItem = { 
      userId: 1,
      productId: 1,
      quantity: 20
    };
    const response = await request(app)
      .put(`/cart/${cartItemId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedItem);
    
    expect(response.status).toBe(200);
  });

  it('should remove an item from the cart by ID', async () => {
    const newItemResponse = await request(app)
      .post('/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        userId: 1,
        productId: 1,
        quantity: 1
      });
  
    const cartItemId = newItemResponse.body.id;
  
    const response = await request(app)
      .delete(`/cart/${cartItemId}`)
      .set('Authorization', `Bearer ${token}`);
  
    expect(response.status).toBe(204);
  
    const verifyResponse = await request(app)
      .get(`/cart/${cartItemId}`)
      .set('Authorization', `Bearer ${token}`);
  
    expect(verifyResponse.status).toBe(404);
  });


});
