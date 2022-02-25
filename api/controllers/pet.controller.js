import { Pet } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Controller get all Pets
export const getAllPets = async (request, response) => {
  try {
    const pets = await Pet.find();
    if (pets.length === 0) response.status(204).send();
    else response.status(200).json(pets);
  } catch (error) {
    response.status(500).json({ error });
  }
};

// Controller get pets by user
export const getPetsByUser = async (req, res) => {
  try {
    const { id: idUser } = req.params;
    const pet = await Pet.find({ user_id: idUser });
    res.json(pet);
  } catch (error) {
    res.status(403).json({ error });
  }
};

// Controller create one pet
export const createPet = async (req, res) => {
  try {
    const pet = new Pet(req.body);
    const newPet = await pet.save();
    newPet && res.status(201).json(newPet);
  } catch (error) {
    response.status(500).json({ error });
  }
};

export const findPet = async (req, res, next) => {
  const { id: idPet } = req.params;

  try {
    const pet = await Pet.findById(idPet);
    if (pet) {
      req.data = { pet };
      next();
    } else {
      req.status(204).json({ error: "No pet" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updatePet = async (req, res) => {
  const petToUpdate = req.body;
  const { pet } = req.data;

  try {
    Pet.updateOne(pet, petToUpdate, (error, updatedPet) => {
      if (!error) {
        res.status(200).json(updatedPet);
      } else res.status(500).send(error);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deletePet = async (req, res) => {
  const { id: idPet } = req.params;
  try {
    const petToDelete = await Pet.findById(idPet);
    if (!petToDelete) {
      res.status(204).send({ err: "No pet to delete" });
    } else {
      const deletedPet = await Pet.deleteOne(petToDelete);
      if (deletedPet) res.status(200).json(deletedPet);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
