import express from "express";

import { dateCtrl } from "../controllers/index.js";

// const { login, createUser } = userCtlr;
const { getAllDates, createDate, getOneDate, findDate, updateDate } =
  dateCtrl;

const router = express.Router();

const dateRoutes = {
  GET_ALL_DATES: "/dates",
  GET_ONE_DATES: "/dates/:id",
  CREATE: "/dates/create",
  UPDATE: "/dates/update/:id",
  //   LOGIN: "/login",
};

router.get(dateRoutes.GET_ALL_DATES, getAllDates);
router.get(dateRoutes.GET_ONE_DATES, getOneDate);
router.post(dateRoutes.CREATE, createDate);
router.put(dateRoutes.UPDATE, findDate, updateDate);
// router.post(userRoutes.LOGIN, login);

export default router;
