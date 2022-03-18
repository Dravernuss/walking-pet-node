import express from "express";

import { walkerCtrl } from "../controllers/index.js";

import { validateToken } from "../middlewares/index.js";

const {
  getAllWalkers,
  createWalker,
  getOneWalker,
  findWalker,
  updateWalker,
  login,
  deleteWalker,
} = walkerCtrl;

const router = express.Router();

const walkerRoutes = {
  GET_ALL_WALKERS: "/walkers",
  GET_ONE_WALKERS: "/walkers/:id",
  CREATE: "/walkers/create",
  UPDATE: "/walkers/update/:id",
  DELETE: "/walkers/delete/:id",
  LOGIN: "/walkers/login",
};

router.get(walkerRoutes.GET_ALL_WALKERS, getAllWalkers);
router.get(walkerRoutes.GET_ONE_WALKERS, getOneWalker);
router.post(walkerRoutes.CREATE, createWalker);
router.put(walkerRoutes.UPDATE, findWalker, updateWalker);
router.delete(walkerRoutes.DELETE, deleteWalker);
router.post(walkerRoutes.LOGIN, login);

export default router;
