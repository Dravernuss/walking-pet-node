import express from "express";

import { dateCtrl } from "../controllers/index.js";

const {
  getAllDates,
  getDatesByUser,
  getDatesByWalker,
  createDate,
  findDate,
  updateDate,
  getDateById,
} = dateCtrl;

const router = express.Router();

const dateRoutes = {
  GET_ALL_DATES: "/dates",
  GET_DATE_BY_ID: "/dates/:id",
  GET_DATES_BY_USER: "/dates/user/:id_user",
  GET_DATES_BY_WALKER: "/dates/walker/:id_walker",
  CREATE: "/dates/create/:id_user",
  UPDATE: "dates/update/:id",
};

router.get(dateRoutes.GET_ALL_DATES, getAllDates);
router.get(dateRoutes.GET_DATE_BY_ID, getDateById);
router.get(dateRoutes.GET_DATES_BY_USER, getDatesByUser);
router.get(dateRoutes.GET_DATES_BY_WALKER, getDatesByWalker);
router.post(dateRoutes.CREATE, createDate);
router.put(dateRoutes.UPDATE, findDate, updateDate);

export default router;
