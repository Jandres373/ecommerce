import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken'; 
import User from '../models/user.model';
import Category from '../models/category.model'; 
import sequelize from '../database/db_config';
import dotenv from 'dotenv';

dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET || " ";
let token: any;

async function getToken() {
  const user = await User.findOne({ where: { id: 1 } });
  return jwt.sign({ user }, TOKEN_SECRET, { expiresIn: '1d' });
}

beforeAll(async () => {
  token = await getToken();
});

describe('Category Controller', () => {
  beforeEach(async () => {
    await sequelize.sync(); 
  });

  it('should get all categories', async () => {
    const response = await request(app)
      .get('/categories')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should update a category by ID', async () => {
    const category:any = await Category.create({ name: 'Noticias' });
    const updatedCategory = { name: 'NoSeQue' };

    const response = await request(app)
      .put(`/categories/${category.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedCategory);

    expect(response.status).toBe(200);
  });

  it('should delete a category by ID', async () => {
    const category:any = await Category.create({ name: 'Arepas' });

    const response = await request(app)
      .delete(`/categories/${category.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);

    const categories = await Category.findAll();
    expect(categories).toBeDefined();
  });

  it('should create a new category', async () => {
    const newCategory = { name: 'Electronics' };
  
    const response = await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${token}`)
      .send(newCategory);
  
    expect(response.status).toBe(201);
  
    expect(response.body.name).toBe(newCategory.name);
  
    const createdCategory = await Category.findOne({
      where: { name: newCategory.name },
    });
    expect(createdCategory).not.toBeNull(); 
    const duplicateCategories = await Category.findAll({
      where: { name: newCategory.name },
    });
    expect(duplicateCategories.length).toBe(1); 
  });

});
