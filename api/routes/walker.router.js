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
  getAllWalkersRegistrations,
  getOneWalkerByEmail,
} = walkerCtrl;

const router = express.Router();

const walkerRoutes = {
  GET_ALL_WALKERS: "/walkers",
  GET_ALL_REGISTRATION: "/walkers/registration",
  GET_ONE_WALKER: "/walkers/:id",
  GET_ONE_WALKER_BY_EMAIL: "/walkers/exists/:email",
  CREATE: "/walkers/create",
  UPDATE: "/walkers/update/:id",
  DELETE: "/walkers/delete/:id",
  LOGIN: "/walkers/login",
};

router.get(walkerRoutes.GET_ALL_WALKERS, getAllWalkers);
router.get(walkerRoutes.GET_ALL_REGISTRATION, getAllWalkersRegistrations);
router.get(walkerRoutes.GET_ONE_WALKER, getOneWalker);
router.get(walkerRoutes.GET_ONE_WALKER_BY_EMAIL, getOneWalkerByEmail);
router.post(walkerRoutes.CREATE, createWalker);
router.put(walkerRoutes.UPDATE, findWalker, updateWalker);
router.delete(walkerRoutes.DELETE, deleteWalker);
router.post(walkerRoutes.LOGIN, login);

export default router;
