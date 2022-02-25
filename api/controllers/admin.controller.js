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
  try {
    const admin = new Admin(req.body);
    const newAdmin = await admin.save();
    newAdmin && res.status(201).json(newAdmin);
  } catch (error) {
    response.status(500).json({ error });
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
