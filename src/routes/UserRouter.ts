import { Router } from "express";
import { getUsers, createUser } from "../controllers/UsersController";

const userRouter = Router();

userRouter.get('/users', getUsers);

userRouter.post('/users', createUser);

export {userRouter};