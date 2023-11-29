import { Router } from "express";
import { getUsers, createUser, deleteUser, updateUser, userLogin } from "../controllers/user.controller";
import makePrivate from "../middlewares/makePrivate";

const userRouter = Router();

userRouter.route('/')
  .get(makePrivate, getUsers) 
  .post(createUser); 

userRouter.route('/:id')
  .delete(makePrivate, deleteUser) 
  .put(makePrivate, updateUser); 

userRouter.route('/login')
  .post(userLogin); 

export default userRouter;

/* 
GET -> /users (privado)
POST -> /users (público)
DELETE -> /users/:id (privado)
PUT -> /users/:id (privado)
POST -> /users/login (público)
*/