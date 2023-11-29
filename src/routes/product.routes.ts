import { Router } from "express";
import makePrivate from "../middlewares/makePrivate";
import { getProducts, createProduct, deleteProduct, updateProduct } from "../controllers/product.controller";

const productRouter = Router();

productRouter.route('/')
  .get(getProducts) 
  .post(makePrivate, createProduct); 

productRouter.route('/:id')
  .get(getProducts) 
  .delete(makePrivate, deleteProduct) 
  .put(makePrivate, updateProduct); 

export default productRouter;

/* GET -> /products (público)
POST -> /products (privado)
GET -> /products/:id (público)
DELETE -> /products/:id (privado)
PUT -> /products/:id (privado)
 */