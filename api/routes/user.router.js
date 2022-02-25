import express from "express";

import { userCtrl } from "../controllers/index.js";

// const { login, createUser } = userCtlr;
const { getAllUsers, createUser, getOneUser, findUser, updateUser } = userCtrl;

const router = express.Router();

const userRoutes = {
  GET_ALL_USERS: "/users",
  GET_ONE_USER: "/users/:id",
  CREATE: "/users/create",
  UPDATE: "/users/update/:id",
  //   LOGIN: "/login",
};

router.get(userRoutes.GET_ALL_USERS, getAllUsers);
router.get(userRoutes.GET_ONE_USER, getOneUser);
router.post(userRoutes.CREATE, createUser);
router.put(userRoutes.UPDATE, findUser, updateUser);
// router.post(userRoutes.LOGIN, login);

export default router;
