import { Router } from "express";
import makePrivate from "../middlewares/makePrivate";
import { getCategories, createCategory, deleteCategory, updateCategory } from "../controllers/category.controller";

const categoryRouter = Router();

categoryRouter.route('/')
  .get(getCategories) 
  .post(makePrivate, createCategory); 

categoryRouter.route('/:id')
  .delete(makePrivate, deleteCategory) 
  .put(makePrivate, updateCategory); 

export default categoryRouter;

/* 
GET -> /categories (público)
POST -> /categories (privado)
DELETE -> /categories/:id (privado)
PUT -> /categories/:id (privado)
*/