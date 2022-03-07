import { Admin } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Controller get all Admins
export const getAllAdmins = async (request, response) => {
  try {
    const admins = await Admin.find();
    if (admins.length === 0) response.status(204).send();
    else response.status(200).json(admins);
  } catch (error) {
    response.status(500).json({ error });
  }
};

// Controller get one admin
export const getOneAdmin = async (req, res) => {
  try {
    const { id: idAdmin } = req.params;
    const admin = await Admin.findById(idAdmin);
    res.json(admin);
  } catch (error) {
    res.status(403).json({ error });
  }
};

// Controller create one admin
export const createAdmin = async (req, res) => {
  const { password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const newAdmin = new Admin({ ...req.body, password: hash });
  
  try {
    const admin = await newAdmin.save();
    admin && res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const findAdmin = async (req, res, next) => {
  const { id: idAdmin } = req.params;

  try {
    const admin = await Admin.findById(idAdmin);
    if (admin) {
      req.data = { admin };
      next();
    } else {
      req.status(204).json({ error: "No admin" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateAdmin = async (req, res) => {
  const adminToUpdate = req.body;
  const { admin } = req.data;

  try {
    Admin.updateOne(admin, adminToUpdate, (error, updatedAdmin) => {
      if (!error) {
        res.status(200).json(updatedAdmin);
      } else res.status(500).send(error);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const loginAdmin = async (req, res) => {
  console.log('0entre a adminlogin')
  const { email, password } = req.body;
  const adminDB = await Admin.findOne({ email });
  console.log('adminDB',adminDB);
  if (!adminDB) {
    res.status(403).send();
    return;
  }

  //Validate Hash
  const passToHash = `${password}`;
  bcrypt.compare(passToHash, adminDB.password, (err, isPassValid) => {
    if (email === adminDB.email && isPassValid ) {
      //JWT : el token contendrá estas variables, lo podemos ver en el sgte link : https://jwt.io/
      jwt.sign(
        { 
          email: adminDB.email,
          name: adminDB.name,
          role:adminDB.role,
          _id:adminDB._id
        },
        process.env.SECRET_KEY,
        (error, token) => {
          if (!error) {
            res.status(200).json({
              token
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
