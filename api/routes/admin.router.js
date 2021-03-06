import express from "express";

import { adminCtrl } from "../controllers/index.js";

const {
  getAllAdmins,
  getOneAdmin,
  createAdmin,
  findAdmin,
  updateAdmin,
  loginAdmin,
} = adminCtrl;

const router = express.Router();

const adminRoutes = {
  GET_ALL_ADMINS: "/admins",
  GET_ONE_ADMIN: "/admins/:id",
  CREATE: "/admins/create",
  UPDATE: "/admins/update/:id",
  LOGIN: "/admins/login",
};

router.get(adminRoutes.GET_ALL_ADMINS, getAllAdmins);
router.get(adminRoutes.GET_ONE_ADMIN, getOneAdmin);
router.post(adminRoutes.CREATE, createAdmin);
router.put(adminRoutes.UPDATE, findAdmin, updateAdmin);
router.post(adminRoutes.LOGIN, loginAdmin);

export default router;
