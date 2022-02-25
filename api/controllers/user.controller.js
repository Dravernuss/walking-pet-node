import { User } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Controller get all Users
export const getAllUsers = async (request, response) => {
  try {
    const users = await User.find();
    if (users.length === 0) response.status(204).send();
    else response.status(200).json(users);
  } catch (error) {
    response.status(500).json({ error });
  }
};

// Controller get one walker
export const getOneUser = async (req, res) => {
  const { id: idUser } = req.params;
  const user = await User.findById(idUser);
  res.json(user);
};

// Controller create one walker
export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    newUser && res.status(201).json(newUser);
  } catch (error) {
    response.status(500).json({ error });
  }
};

export const findUser = async (req, res, next) => {
  const { id: idUser } = req.params;

  try {
    const user = await User.findById(idUser);
    if (user) {
      req.data = { user };
      next();
    } else {
      req.status(204).json({ error: "No user" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateUser = async (req, res) => {
  const userToUpdate = req.body;
  const { user } = req.data;

  try {
    User.updateOne(user, userToUpdate, (error, updatedUser) => {
      if (!error) {
        res.status(200).json(updatedUser);
      } else res.status(500).send(error);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
