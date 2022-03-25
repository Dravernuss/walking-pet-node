import { Walker } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RegistrationWalkerInit } from "../../templates/Welcome/RegistrationWalkerInit.js";
import senderMail from "../services/senderMail.js";
import { RegistrationWalkerAccepted } from "../../templates/Welcome/RegistrationWalkerAccepted.js";
import { RegistrationWalkerRejected } from "../../templates/Welcome/RegistrationWalkerRejected.js";

// Controller get one walker
export const getOneWalker = async (req, res) => {
  const { id: idWalker } = req.params;
  const walker = await Walker.findById(idWalker);
  res.json(walker);
};

// Controller create one walker
export const createWalker = async (req, res) => {
  const { password, email } = req.body;

  const exist_walker = await Walker.findOne({ email: email });

  try {
    if (exist_walker) throw new Error();

    const hash = await bcrypt.hash(password, 10);

    const newWalker = new Walker({ ...req.body, password: hash });
    const walker = await newWalker.save();
    //-------------- SEND MAIL -----------------------------
    senderMail.config = {
      host: "smtp.sendgrid.net",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "apikey", // generated ethereal user
        pass: process.env.SENDGRID_API_KEY, // generated ethereal password
      },
    };
    const htmlWelcomeWalkerInit = RegistrationWalkerInit();
    await senderMail.sendMail({
      from: '"WalkingPet Application" <walkingpet.application@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Solicitud de Registro Recibida", // Subject line
      html: htmlWelcomeWalkerInit,
    });

    //------------------------------------------------------
    walker && res.status(201).json(walker);
  } catch (error) {
    res.status(403).send();
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
    Walker.updateOne(walker, walkerToUpdate, async (error, updatedWalker) => {
      if (!error) {
        if (walkerToUpdate.hasOwnProperty("admin_comment")) {
          //-------------- SEND MAIL -----------------------------
          senderMail.config = {
            host: "smtp.sendgrid.net",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: "apikey", // generated ethereal user
              pass: process.env.SENDGRID_API_KEY, // generated ethereal password
            },
          };
          const AdminResponse =
            walkerToUpdate.registration_state === "Aprobado"
              ? RegistrationWalkerAccepted(walkerToUpdate.admin_comment)
              : RegistrationWalkerRejected(walkerToUpdate.admin_comment);
          await senderMail.sendMail({
            from: '"WalkingPet Application" <walkingpet.application@gmail.com>', // sender address
            to: walker.email, // list of receivers
            subject: "Respuesta solicitud registro paseador WalkingPet", // Subject line
            html: AdminResponse,
          });

          //------------------------------------------------------
        }
        res.status(200).json(updatedWalker);
      } else res.status(500).send(error);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteWalker = async (req, res) => {
  const { id: idWalker } = req.params;
  try {
    const walkerToDelete = await Walker.findById(idWalker);
    if (!walkerToDelete) {
      res.status(204).send({ err: "No walker to delete" });
    } else {
      const deletedWalker = await Walker.deleteOne(walkerToDelete);
      if (deletedWalker) res.status(200).json(deletedWalker);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const walkerDB = await Walker.findOne({ email });
  if (!walkerDB) {
    res.status(403).send();
    return;
  }
  //Validate Hash
  const passToHash = `${password}`;
  bcrypt.compare(passToHash, walkerDB.password, (err, isPassValid) => {
    if (email === walkerDB.email && isPassValid && walkerDB.avalaible) {
      //JWT
      jwt.sign(
        { email: walkerDB.email },
        process.env.SECRET_KEY,
        (error, token) => {
          if (!error) {
            res.status(200).json({
              token,
              ...walkerDB._doc,
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

// Controller get all Walkers
export const getAllWalkers = async (request, response) => {
  const ready = true;
  const avalaible = true;
  try {
    const walkers = await Walker.find({ ready, avalaible });
    if (walkers.length === 0) response.status(204).send();
    else response.status(200).json(walkers);
  } catch (error) {
    response.status(500).json({ error });
  }
};
export const getAllWalkersRegistrations = async (request, response) => {
  try {
    const walkers = await Walker.find();
    if (walkers.length === 0) response.status(204).send();
    else response.status(200).json(walkers);
  } catch (error) {
    response.status(500).json({ error });
  }
};
