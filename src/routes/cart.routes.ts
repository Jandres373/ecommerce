import { Router } from "express";
import makePrivate from "../middlewares/makePrivate";
import { getCartItems, addToCart, removeFromCart, updateCartItemQuantity, getOneCartItem } from "../controllers/cart.controller";

const cartRouter = Router();

cartRouter.route('/')
  .get(makePrivate, getCartItems) 
  .post(makePrivate, addToCart); 

cartRouter.route('/:id')
  .get(makePrivate, getOneCartItem)
  .delete(makePrivate, removeFromCart) 
  .put(makePrivate, updateCartItemQuantity); 

export default cartRouter;


/* GET -> /cart (privado) debe traer los productos en el carrito del usuario logueado
POST -> /cart (privado) Debe añadir un producto al carrito. El userId debe ser el del usuario logueado
DELETE -> /cart/:id (privado) Elimina un producto del carrito
PUT -> /cart/:id (privado) Actualiza un producto del carrito. Sólo debe permitir actualizar quantity, userId y productId no se pueden actualizar
 */