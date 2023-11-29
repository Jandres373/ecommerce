import { Router } from "express";
import userRouter from "./user.routes";
import cartRouter from "./cart.routes";
import categoryRouter from "./category.routes";
import imageRouter from "./image.routes";
import productRouter from "./product.routes";
import purchaseRouter from "./purchase.routes";

const router = Router();

router.use('/users',userRouter);
router.use('/cart',cartRouter);
router.use('/categories',categoryRouter);
router.use('/product_images',imageRouter);
router.use('/products',productRouter);
router.use('/purchases',purchaseRouter);

export default router;