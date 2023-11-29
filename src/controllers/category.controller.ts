import Category from "../models/category.model";
import { Request, Response } from "express";
import Product from "../models/product.model";

// Obtener todas las categorías
export const getCategories = async (_: Request, res: Response) => {
  try {
    const categories = await Category.findAll({ include: [{ model: Product, as: 'products' }] });
    res.status(200).json(categories);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al obtener categorías: ${error}` });
  }
};

// Crear una nueva categoría
export const createCategory = async (req: Request, res: Response) => {
  try {
    const newCategoryData = req.body;
    const newCategory = await Category.create(newCategoryData);

    res.status(201).json(newCategory);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al crear categoría: ${error}` });
  }
};

// Eliminar una categoría por su ID
export const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id);

  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: categoryId,
      },
    });

    if (deletedCategory) {
      res.status(204).send();
    } else {
      res.status(404).send("Categoría no encontrada");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al eliminar categoría: ${error}` });
  }
};

// Actualizar una categoría por su ID
export const updateCategory = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id, 10);

  try {
    const { name } = req.body;

    const [updatedRows] = await Category.update(
      {
        name,
      },
      {
        where: {
          id: categoryId,
        },
      }
    );

    if (updatedRows > 0) {
      res.status(200).send("Categoría actualizada correctamente");
    } else {
      res.status(404).send("Categoría no encontrada");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al actualizar categoría: ${error}` });
  }
};
