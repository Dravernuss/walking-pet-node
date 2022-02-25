import express from "express";

import { walkerCtrl } from "../controllers/index.js";

// const { login, createUser } = userCtlr;
const { getAllWalkers, createWalker, getOneWalker, findWalker, updateWalker } =
  walkerCtrl;

const router = express.Router();

const walkerRoutes = {
  GET_ALL_WALKERS: "/walkers",
  GET_ONE_WALKERS: "/walkers/:id",
  CREATE: "/walkers/create",
  UPDATE: "/walkers/update/:id",
  //   LOGIN: "/login",
};

router.get(walkerRoutes.GET_ALL_WALKERS, getAllWalkers);
router.get(walkerRoutes.GET_ONE_WALKERS, getOneWalker);
router.post(walkerRoutes.CREATE, createWalker);
router.put(walkerRoutes.UPDATE, findWalker, updateWalker);
// router.post(userRoutes.LOGIN, login);

export default router;
