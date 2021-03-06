import { Comment, Walker, User, Date } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import senderMail from "../services/senderMail.js";
import { MessageUser } from "../../templates/Comments/MessageUser.js";
import { MessageWalker } from "../../templates/Comments/MessageWalker.js";

// Controller get all Comments
export const getAllComments = async (request, response) => {
  try {
    const comments = await Comment.find();
    if (comments.length === 0) response.status(204).send();
    else response.status(200).json(comments);
  } catch (error) {
    response.status(500).json({ error });
  }
};

// Controller get Comment by Id
export const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.find({ _id: id });
    res.json(comment);
  } catch (error) {
    res.status(403).json({ error });
  }
};

// Controller create Comments
export const createComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    const newComment = await comment.save();
    newComment && res.status(201).json(newComment);
  } catch (error) {
    response.status(500).json({ error });
  }
};

// Controller get Comments by Walker
export const getCommentsByWalker = async (req, res) => {
  try {
    const { id_walker: idWalker } = req.params;
    const comments = await Comment.find({ walker_id: idWalker });
    res.json(comments);
  } catch (error) {
    res.status(403).json({ error });
  }
};

// Controller get Reports
export const getAllReports = async (req, res) => {
  try {
    const reports = await Comment.find({ type: "Report" });
    res.json(reports);
  } catch (error) {
    res.status(403).json({ error });
  }
};

export const findComment = async (req, res, next) => {
  const { id: idComment } = req.params;
  try {
    const comment = await Comment.findById(idComment);
    if (comment) {
      req.data = { comment };
      next();
    } else {
      req.status(204).json({ error: "No comment" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update Comment STATUS and MESSAGES FROM ADMIN
export const updateCommentAdmin = async (req, res) => {
  const commentToUpdate = req.body;
  const { comment } = req.data;
  try {
    Comment.updateOne(
      comment,
      commentToUpdate,
      async (error, updatedComment) => {
        if (!error) {
          const { email: emailWalker } = await Walker.findOne({
            _id: comment.walker_id,
          });
          const { email: emailUser } = await User.findOne({
            _id: comment.user_id,
          });
          const { date_day: dateDay, date_hour: dateHour } = await Date.findOne(
            {
              _id: comment.date_id,
            }
          );

          const isToUser = commentToUpdate.destinatary === "user";

          const messageUser = MessageUser(
            dateDay,
            dateHour,
            comment.user_name,
            comment.walker_name,
            commentToUpdate.message_user
          );
          const messageWalker = MessageWalker(
            dateDay,
            dateHour,
            comment.comment,
            comment.report_photo_url,
            comment.user_name,
            comment.walker_name,
            commentToUpdate.message_walker
          );
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

          await senderMail.sendMail({
            from: '"WalkingPet Application" <walkingpet.application@gmail.com>', // sender address
            to: isToUser ? emailUser : emailWalker, // list of receivers
            subject: "Reporte de Cita - Walking Pet", // Subject line
            html: isToUser ? messageUser : messageWalker,
          });

          //------------------------------------------------------
          res.status(200).json(updatedComment);
        } else res.status(500).send(error);
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};
