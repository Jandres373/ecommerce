import { Router } from "express";
import makePrivate from "../middlewares/makePrivate";
import { getPurchases, createPurchase } from "../controllers/purchase.controller";

const purchaseRouter = Router();

purchaseRouter.route('/')
  .get(makePrivate, getPurchases) 
  .post(makePrivate, createPurchase); 

export default purchaseRouter;


/* GET -> /purchases (privado) debe traer las compras del usuario logueado
POST -> /purchases (privado) Debe tomar los productos del carrito del usuario logueado, pasarlos a la tabla de Purchase, y eliminarlos de la tabla de Cart.
 */