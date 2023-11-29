import Image from "../models/image.model";
import { Request, Response } from "express";

// Obtener todas las imágenes
export const getImages = async (_: Request, res: Response) => {
  try {
    const images = await Image.findAll();
    res.status(200).json(images);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al obtener imágenes: ${error}` });
  }
};

// Crear una nueva imagen
export const createImage = async (req: Request, res: Response) => {
  try {
    const newImageData = req.body;
    const newImage = await Image.create(newImageData);

    res.status(201).json(newImage);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al crear imagen: ${error}` });
  }
};

// Eliminar una imagen por su ID
export const deleteImage = async (req: Request, res: Response) => {
  const imageId = parseInt(req.params.id);

  try {
    const deletedImage = await Image.destroy({
      where: {
        id: imageId,
      },
    });

    if (deletedImage) {
      res.status(204).send();
    } else {
      res.status(404).send("Imagen no encontrada");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al eliminar imagen: ${error}` });
  }
};

// Actualizar una imagen por su ID
export const updateImage = async (req: Request, res: Response) => {
  const imageId = parseInt(req.params.id, 10);

  try {
    const { url, productId } = req.body;

    const [updatedRows] = await Image.update(
      {
        url,
        productId,
      },
      {
        where: {
          id: imageId,
        },
      }
    );

    if (updatedRows > 0) {
      res.status(200).send("Imagen actualizada correctamente");
    } else {
      res.status(404).send("Imagen no encontrada");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al actualizar imagen: ${error}` });
  }
};
