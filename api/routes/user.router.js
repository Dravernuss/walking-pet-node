import express from "express";

import { userCtrl } from "../controllers/index.js";

import { validateToken } from "../middlewares/index.js";

// const { login, createUser } = userCtlr;
const {
  getAllUsers,
  createUser,
  getOneUser,
  findUser,
  updateUser,
  login,
  deleteUser,
} = userCtrl;

const router = express.Router();

const userRoutes = {
  GET_ALL_USERS: "/users",
  GET_ONE_USER: "/users/:id",
  CREATE: "/users/create",
  UPDATE: "/users/update/:id",
  DELETE: "/users/delete/:id",
  LOGIN: "/users/login",
};

router.get(userRoutes.GET_ALL_USERS, validateToken, getAllUsers);
router.get(userRoutes.GET_ONE_USER, validateToken, getOneUser);
router.post(userRoutes.CREATE, createUser);
router.put(userRoutes.UPDATE, validateToken, findUser, updateUser);
router.delete(userRoutes.DELETE, validateToken, deleteUser);
router.post(userRoutes.LOGIN, login);

export default router;
