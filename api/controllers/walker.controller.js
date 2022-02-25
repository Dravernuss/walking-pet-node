import { Walker } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Controller get all Walkers
export const getAllWalkers = async (request, response) => {
  try {
    const walkers = await Walker.find();
    if (walkers.length === 0) response.status(204).send();
    else response.status(200).json(walkers);
  } catch (error) {
    response.status(500).json({ error });
  }
};

// Controller get one walker
export const getOneWalker = async (req, res) => {
  const { id: idWalker } = req.params;
  const walker = await Walker.findById(idWalker);
  res.json(walker);
};

// Controller create one walker
export const createWalker = async (req, res) => {
  try {
    const walker = new Walker(req.body);
    const newWalker = await walker.save();
    newWalker && res.status(201).json(newWalker);
  } catch (error) {
    response.status(500).json({ error });
  }
};

export const findWalker = async (req, res, next) => {
  const { id: idWalker } = req.params;

  try {
    const walker = await Walker.findById(idWalker);
    if (walker) {
      req.data = { walker };
      next();
    } else {
      req.status(204).json({ error: "No walker" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateWalker = async (req, res) => {
  const walkerToUpdate = req.body;
  const { walker } = req.data;

  try {
    Walker.updateOne(walker, walkerToUpdate, (error, updatedWalker) => {
      if (!error) {
        res.status(200).json(updatedWalker);
      } else res.status(500).send(error);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
