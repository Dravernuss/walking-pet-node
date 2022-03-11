import { Date } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Controller get all Dates
export const getAllDates = async (request, response) => {
  try {
    const dates = await Date.find();
    if (dates.length === 0) response.status(204).send();
    else response.status(200).json(dates);
  } catch (error) {
    response.status(500).json({ error });
  }
};

// Controller get Dates by user
export const getDatesByUser = async (req, res) => {
  try {
    const { id_user: idUser } = req.params;
    const date = await Date.find({ user_id: idUser });
    res.json(date);
  } catch (error) {
    res.status(403).json({ error });
  }
};

// Controller get Dates by user
export const getDatesByWalker = async (req, res) => {
  try {
    const { id_walker: idWalker } = req.params;
    const date = await Date.find({ walker_id: idWalker });
    res.json(date);
  } catch (error) {
    res.status(403).json({ error });
  }
};

// Controller create a date
export const createDate = async (req, res) => {
  try {
    const { id_user: user_id } = req.params;

    const date = new Date({ ...req.body, user_id });
    const newDate = await date.save();
    newDate && res.status(201).json(newDate);
  } catch (error) {
    response.status(500).json({ error });
  }
};
