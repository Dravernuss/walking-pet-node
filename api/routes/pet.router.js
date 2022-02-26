import express from "express";

import { petCtrl } from "../controllers/index.js";

// const { login, createUser } = userCtlr;
const { getAllPets, createPet, getPetsByUser, findPet, updatePet, deletePet } =
  petCtrl;

const router = express.Router();

const petRoutes = {
  GET_ALL_PETS: "/pets",
  GET_ONE_PET: "/pets/:id",
  CREATE: "/pets/create/:id",
  UPDATE: "/pets/update/:id",
  DELETE: "/pets/delete/:id",

  //   LOGIN: "/login",
};

router.get(petRoutes.GET_ALL_PETS, getAllPets);
router.get(petRoutes.GET_ONE_PET, getPetsByUser);
router.post(petRoutes.CREATE, createPet);
router.put(petRoutes.UPDATE, findPet, updatePet);
router.delete(petRoutes.DELETE, deletePet);
// router.post(userRoutes.LOGIN, login);

export default router;
