import { Router } from "express";
import makePrivate from "../middlewares/makePrivate";
import { getImages, createImage, deleteImage, updateImage } from "../controllers/image.controller";

const imageRouter = Router();

imageRouter.route('/')
  .get(makePrivate, getImages) 
  .post(makePrivate, createImage) 
  .delete(makePrivate, deleteImage); 

imageRouter.route('/:id')
  .put(makePrivate, updateImage);

export default imageRouter;


/* GET -> /product_images (privado)
POST -> /product_images (privado)
DELETE -> /product_images (privado)
PUT -> /product_images/:id (privado)
 */