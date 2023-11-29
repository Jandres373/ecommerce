import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Cart from '../models/cart.model';
import Purchase from "../models/purchase.model";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET || " ";

//~~ Obtener todos los usuarios (privado)
export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.findAll({ include: [{ model: Cart, as: 'carts' }, { model: Purchase, as: 'purchases' }] });
    res.status(200).json(users);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al obtener datos: ${error}` });
  }
};

//~~ Crear un nuevo usuario (público)
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUserData = await req.body;
    if (!newUserData) return res.status(400).json({ message: "there's an error" });

    const encryptedPassword = await bcrypt.hash(newUserData.password, 10);
    const newUser = await User.create({
      ...newUserData,
      password: encryptedPassword,
    });

    res.status(201).json(newUser);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al obtener datos: ${error}` });
  }
};

//~~ Eliminar un usuario por su ID (privado)
export const deleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  try {
    const deletedUser = await User.destroy({
      where: {
        id: userId,
      },
    });

    if (deletedUser) {
      res.status(204).send();
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al obtener datos: ${error}` });
  }
};

//~~ Actualizar un usuario por su ID (privado)
export const updateUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const { firstName, lastName, email, password, phone } = req.body;

    const [updatedRows] = await User.update(
      {
        firstName,
        lastName,
        email,
        password,
        phone,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    if (updatedRows > 0) {
      res.status(200).send("Usuario actualizado correctamente");
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al obtener datos: ${error}` });
  }
};

//~~ Inicio de sesión (público)
export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'El usuario no existe' });

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) return res.status(400).json({ message: 'La contraseña es incorrecta' });

    const token = await jwt.sign({ user }, TOKEN_SECRET, { expiresIn: '1d' });
    res.status(200).json({ user, token });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: `Error al obtener datos: ${error}` });
  }
};

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};
