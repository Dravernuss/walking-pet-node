import { Date, Walker, User } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import senderMail from "../services/senderMail.js";
import { DateChanged } from "../../templates/Dates/DateChanged.js";
import { DateAsked } from "../../templates/Dates/DateAsked.js";

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
// Controller get Date by Id
export const getDateById = async (req, res) => {
  try {
    // const { id_user: idUser } = req.params;
    const { id } = req.params;
    const date = await Date.find({ _id: id });
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
    const date = new Date(req.body);
    const newDate = await date.save();
    //-------------- SEND MAIL -----------------------------
    const { email } = await Walker.findOne({ _id: date.walker_id });
    senderMail.config = {
      host: "smtp.sendgrid.net",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "apikey", // generated ethereal user
        pass: process.env.SENDGRID_API_KEY, // generated ethereal password
      },
    };
    const htmlDateAsked = DateAsked(
      newDate.user_id,
      newDate.user_name,
      newDate.district_selected,
      newDate.client_address,
      newDate.date_day,
      newDate.date_hour,
      newDate.date_time,
      newDate.total_price
    );
    await senderMail.sendMail({
      from: '"WalkingPet Application" <walkingpet.application@gmail.com>', // sender address
      to: email, // list of receivers
      subject: `Nueva Cita Solicitada - CLIENTE: ${newDate.user_name}`, // Subject line
      html: htmlDateAsked,
    });

    //------------------------------------------------------
    newDate && res.status(201).json(newDate);
  } catch (error) {
    res.status(500).json({ error });
    console.log("error", error);
  }
};

export const findDate = async (req, res, next) => {
  const { id: idDate } = req.params;
  try {
    const date = await Date.findById(idDate);
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

  try {
    Date.updateOne(date, dateToUpdate, async (error, updatedDate) => {
      if (!error) {
        // const response = dateMaper(updatedDate);
        // res.status(200).json(response);
        //-------------- SEND MAIL -----------------------------
        const { email: emailWalker } = await Walker.findOne({
          _id: date.walker_id,
        });
        const { email: emailUser } = await User.findOne({
          _id: date.user_id,
        });
        senderMail.config = {
          host: "smtp.sendgrid.net",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: "apikey", // generated ethereal user
            pass: process.env.SENDGRID_API_KEY, // generated ethereal password
          },
        };
        const htmlDateChanged = DateChanged();
        await senderMail.sendMail({
          from: '"WalkingPet Application" <walkingpet.application@gmail.com>', // sender address
          to: `${emailWalker}, ${emailUser}`, // list of receivers
          subject: `Estado de Cita Actualizado - WalkingPet`, // Subject line
          html: htmlDateChanged,
        });

        //------------------------------------------------------

        res.status(200).json(updatedDate);
      } else res.status(500).send(error);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
