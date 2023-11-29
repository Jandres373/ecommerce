import Cart from "../models/cart.model";
import Image from "../models/image.model";
import Product from "../models/product.model";
import { Request, Response } from "express";
import Purchase from "../models/purchase.model";

// Obtener todos los productos
export const getProducts = async (_: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Image, as: 'images' },
        { model: Purchase, as: 'purchases' },
        { model: Cart, as: 'carts' }
      ]
    });
    res.status(200).json(products);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al obtener productos: ${error}` });
  }
};

// Crear un nuevo producto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProductData = req.body;
    const newProduct = await Product.create(newProductData);

    res.status(201).json(newProduct);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al crear producto: ${error}` });
  }
};

// Eliminar un producto por su ID
export const deleteProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);

  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: productId,
      },
    });

    if (deletedProduct) {
      res.status(204).send();
    } else {
      res.status  (404).send("Producto no encontrado");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al eliminar producto: ${error}` });
  }
};

// Actualizar un producto por su ID
export const updateProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id, 10);

  try {
    const { title, description, categoryId, brand, price } = req.body;

    const [updatedRows] = await Product.update(
      {
        title,
        description,
        categoryId,
        brand,
        price: parseInt(price),
      },
      {
        where: {
          id: productId,
        },
      }
    );

    if (updatedRows > 0) {
      res.status(200).send("Producto actualizado correctamente");
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al actualizar producto: ${error}` });
  }
};
