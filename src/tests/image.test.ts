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

describe('Image Controller', () => {
  async function getToken() {
    const user = await User.findOne({ where: { id: 1 } });
    return jwt.sign({ user }, TOKEN_SECRET, { expiresIn: '1d' });
  }

  beforeAll(async () => {
    token = await getToken();
  });

  it('should get all images', async () => {
    const response = await request(app)
      .get('/product_images')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('should create a new image', async () => {
    const newImage = { url: 'https://example.com/image.jpg', productId: 1 };

    const response = await request(app)
      .post('/product_images')
      .set('Authorization', `Bearer ${token}`)
      .send(newImage);

    expect(response.status).toBe(201);
  });

  it('should delete an image', async () => {
    // Agregar una imagen para luego eliminarla
    const newImageResponse = await request(app)
      .post('/product_images')
      .set('Authorization', `Bearer ${token}`)
      .send({ url: 'https://example.com/image.jpg', productId: 1 });

    const imageId = newImageResponse.body.id;

    const response = await request(app)
      .delete(`/product_images/${imageId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it('should update an image', async () => {
    // Agregar una imagen para luego actualizarla
    const newImageResponse = await request(app)
      .post('/product_images')
      .set('Authorization', `Bearer ${token}`)
      .send({ url: 'https://example.com/image.jpg', productId: 1 });

    const imageId = newImageResponse.body.id;

    const updatedImage = { url: 'https://updated-example.com/image.jpg', productId: 1 };

    const response = await request(app)
      .put(`/product_images/${imageId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedImage);


    expect(response.status).toBe(200);
  });
});
