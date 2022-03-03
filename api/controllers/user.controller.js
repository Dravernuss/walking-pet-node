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
  const { password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const newUser = new User({ ...req.body, password: hash });
  try {
    const user = await newUser.save();
    user && res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error });
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

export const deleteUser = async (req, res) => {
  const { id: idUser } = req.params;
  try {
    const userToDelete = await User.findById(idUser);
    if (!userToDelete) {
      res.status(204).send({ err: "No user to delete" });
    } else {
      const deletedUser = await User.deleteOne(userToDelete);
      if (deletedUser) res.status(200).json(deletedUser);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const userDB = await User.findOne({ email });
  if (!userDB) {
    res.status(403).send();
    return;
  }

  //Validate Hash
  const passToHash = `${password}`;
  bcrypt.compare(passToHash, userDB.password, (err, isPassValid) => {
    if (email === userDB.email && isPassValid && userDB.avalaible) {
      //JWT
      jwt.sign(
        { email: userDB.email },
        process.env.SECRET_KEY,
        //{ expiresIn: "32s" }, // tiempo de duracion del token 3° parametro
        (error, token) => {
          if (!error) {
            res.status(200).json({
              token,
              ...userDB._doc,
            });
          } else {
            res.status(403).send();
          }
        }
      );
    } else {
      res.status(403).send();
    }
  });
};
