import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken'; 
import User from '../models/user.model';
import '../models/index'
import dotenv from 'dotenv';

dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET || " ";
let token: any;

describe('Product Controller', () => {
  async function getToken() {
    const user = await User.findOne({ where: { id: 1 } });
    return jwt.sign({ user }, TOKEN_SECRET, { expiresIn: '1d' });
  }

  beforeAll(async () => {
    token = await getToken();
  });

  it('should get all products', async () => {
    const response = await request(app)
      .get('/products');
    console.log(response.body);
    expect(response.status).toBe(200);
  });

  it('should create a new product', async () => {
    const newProduct = { 
      title: 'New Product', 
      description: 'Description of the new product', 
      categoryId: 1, 
      brand: 'Brand XYZ', 
      price: 100 
    };

    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send(newProduct);

    console.log(response.body);
    expect(response.status).toBe(201);
  });

  it('should get a product by ID', async () => {
    const newProductResponse = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        title: 'Test Product', 
        description: 'Description of the test product', 
        categoryId: 1, 
        brand: 'Brand ABC', 
        price: 50 
      });

    const productId = newProductResponse.body.id;

    const response = await request(app)
      .get(`/products/${productId}`);
    
    console.log(response.body);
    expect(response.status).toBe(200);
  });

  it('should delete a product', async () => {
    const newProductResponse = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        title: 'Product to Delete', 
        description: 'Description of the product to delete', 
        categoryId: 1, 
        brand: 'Brand to Delete', 
        price: 75 
      });

    const productId = newProductResponse.body.id;

    const response = await request(app)
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it('should update a product', async () => {
    const newProductResponse = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        title: 'Product to Update', 
        description: 'Description of the product to update', 
        categoryId: 1, 
        brand: 'Brand to Update', 
        price: 90 
      });

    const productId = newProductResponse.body.id;

    const updatedProduct = { 
      title: 'Updated Product', 
      description: 'Updated description', 
      categoryId: 1, 
      brand: 'Updated Brand', 
      price: 120 
    };

    const response = await request(app)
      .put(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedProduct);

    console.log(response.body);
    expect(response.status).toBe(200);
  });
});
