import { AskForDate } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Controller get all Dates ya está
export const getAllDates = async (request, response) => {
  console.log('esta llamando a los dates')
  try {
    const dates = await AskForDate.find();
    if (dates.length === 0) response.status(204).send();
    else response.status(200).json(dates);
  } catch (error) {
    response.status(500).json({ error });
  }
};

// Controller get one date
export const getOneDate = async (req, res) => {
  const { id: idDate } = req.params;
  const date = await AskForDate.findById(idDate);
  res.json(date);
};

// Controller create one date
export const createDate = async (req, res) => {
  try {
    const date = new AskForDate(req.body);
    const newDate = await date.save();
    newDate && res.status(201).json(newDate);
  } catch (error) {
    response.status(500).json({ error });
  }
};

export const findDate = async (req, res, next) => {
  const { id: idDate } = req.params;

  try {
    const date = await AskForDate.findById(idDate);
    if (date) {
      req.data = { date };
      next();
    } else {
      req.status(204).json({ error: "No date" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateDate = async (req, res) => {
  const dateToUpdate = req.body;
  const { date } = req.data;
  console.log(dateToUpdate, date)
  try {
    AskForDate.updateOne(date, dateToUpdate, (error, updatedDate) => {
      console.log(updatedDate)
      if (!error) {
        res.status(200).json(updatedDate);
      } else res.status(500).send(error);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
