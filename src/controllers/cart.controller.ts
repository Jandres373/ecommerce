import Cart from "../models/cart.model";
import { Request, Response } from "express";
import Product from '../models/product.model';

// Obtener todos los elementos del carrito
export const getCartItems = async (req: Request, res: Response) => {
  try {
    const { id } = (req as any).user;
    const cartItems = await Cart.findAll({
      where: { userId: id },
      include: [{ model: Product, as: 'product', through: { attributes: [] } }],
    });

    const formattedCartItems =  cartItems.map(cartItem => ({
      ...cartItem.toJSON(),
      product: cartItem.product[0] || null,
    }));

    res.status(200).json(formattedCartItems);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error tipo 1 al obtener elementos del carrito: ${error}` });
  }
};
// Obtener un elemento del carrito por su ID
export const getOneCartItem = async (req: Request, res: Response) => {
  const cartItemId = parseInt(req.params.id);

  try {
    const cartItem = await Cart.findByPk(cartItemId, { include: [{ model: Product, as: 'product' }] });

    if (cartItem) {
      res.status(200).json(cartItem);
    } else {
      res.status(404).send("Elemento del carrito no encontrado");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error tipo 2 al obtener elemento del carrito: ${error}` });
  }
};

// Añadir un nuevo elemento al carrito
export const addToCart = async (req: Request, res: Response) => {
  try {
    const newCartItemData = req.body;
    const { id } = (req as any).user;

    const newCartItem = await Cart.create({
      ...newCartItemData,
      userId: id,
      quantity: parseInt(newCartItemData.quantity)
    });

    // No tengo ni idea de como tipar esto aquí porque el tipo Product no tiene los metodos agregados de sequelize al parecer jajajaja si ves esto profe me explicas? XD
    const product = await Product.findByPk(newCartItemData.productId);
    if (product) {
      await (newCartItem as any).addProduct(product);
    }

    res.status(201).json(newCartItem);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error tipo 3 al añadir elemento al carrito: ${error}` });
  }
};

// Eliminar un elemento del carrito por su ID
export const removeFromCart = async (req: Request, res: Response) => {
  const cartItemId = parseInt(req.params.id);

  try {
    const removedCartItem = await Cart.destroy({
      where: {
        id: cartItemId,
      },
    });

    if (removedCartItem) {
      res.status(204).send();
    } else {
      res.status(404).send("Elemento del carrito no encontrado");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al eliminar elemento del carrito: ${error}` });
  }
};

// Actualizar la cantidad de un elemento en el carrito por su ID
export const updateCartItemQuantity = async (req: Request, res: Response) => {
  const cartItemId =  parseInt(req.params.id);

  try {
    const { quantity } = req.body;

    const [updatedRows] = await Cart.update(
      {
        quantity,
      },
      {
        where: {
          id: cartItemId,
        },
      }
    );

    if (updatedRows > 0) {
      res.status(200).send("Cantidad del elemento del carrito actualizada correctamente");
    } else {
      res.status(404).send("Elemento del carrito no encontrado");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al actualizar cantidad del elemento del carrito: ${error}` });
  }
};
