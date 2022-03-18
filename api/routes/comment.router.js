import express from "express";

import { commentCtrl } from "../controllers/index.js";

const {
  getAllComments,
  getCommentsByWalker,
  getAllReports,
  getCommentById,
  createComment,
  findComment,
  updateCommentAdmin,
} = commentCtrl;

const router = express.Router();

const commentRoutes = {
  GET_ALL_COMMENTS: "/comments",
  GET_ALL_COMMENTS_BY_WALKER: "/comments/walker/:id_walker",
  GET_ALL_REPORTS: "/comments/reports",
  GET_COMMENT_BY_ID: "/comments/:id",
  CREATE: "/comments/create",
  UPDATE_ADMIN: "/comments/update/:id",
};

router.get(commentRoutes.GET_ALL_COMMENTS, getAllComments);
router.get(commentRoutes.GET_ALL_COMMENTS_BY_WALKER, getCommentsByWalker);
router.get(commentRoutes.GET_ALL_REPORTS, getAllReports);
router.get(commentRoutes.GET_COMMENT_BY_ID, getCommentById);
router.post(commentRoutes.CREATE, createComment);
router.put(commentRoutes.UPDATE_ADMIN, findComment, updateCommentAdmin);

export default router;
