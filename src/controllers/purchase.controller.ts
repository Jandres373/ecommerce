import Cart from "../models/cart.model";
import Product from "../models/product.model";
import Purchase from "../models/purchase.model";
import { Request, Response } from "express";

// Obtener todas las compras
export const getPurchases = async (req: Request, res: Response) => {
  try {
    const {id} = (req as any).user;
    const purchases = await Purchase.findAll({
      where: { userId: id },
      include: [{ model: Product, as: 'product' }],
    });
    res.status(200).json(purchases);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al obtener compras: ${error}` });
  }
};

// Crear una nueva compra
export const createPurchase = async (req: Request, res: Response) => {
  try {
    const newPurchaseData = req.body;
    const newPurchase = await Purchase.create(newPurchaseData);

    res.status(201).json(newPurchase);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al crear compra: ${error}` });
  }
};

// Eliminar una compra por su ID
export const deletePurchase = async (req: Request, res: Response) => {
  const purchaseId = parseInt(req.params.id);

  try {
    const deletedPurchase = await Purchase.destroy({
      where: {
        id: purchaseId,
      },
    });

    if (deletedPurchase) {
      res.status(204).send();
    } else {
      res.status(404).send("Compra no encontrada");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al eliminar compra: ${error}` });
  }
};

// Actualizar una compra por su ID
export const updatePurchase = async (req: Request, res: Response) => {
  const purchaseId = parseInt(req.params.id, 10);

  try {
    const { userId, productId, quantity } = req.body;

    const [updatedRows] = await Purchase.update(
      {
        userId,
        productId,
        quantity,
      },
      {
        where: {
          id: purchaseId,
        },
      }
    );

    if (updatedRows > 0) {
      res.status(200).send("Compra actualizada correctamente");
    } else {
      res.status(404).send("Compra no encontrada");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al actualizar compra: ${error}` });
  }
};
