import express from "express";
import mongoose from "mongoose";
import {
  walkerRouter,
  userRouter,
  adminRouter,
  petRouter,
  dateRouter,
  commentRouter,
} from "./api/routes/index.js";
// import "dotenv/config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// config environments
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

/**
 * Mongoose
 */

// Connect to db
const dbConnection = process.env.DB_STRING_CONNECTION;
await mongoose.connect(dbConnection);
// Listener to connection error
mongoose.connection.on("error", function (e) {
  console.error("ERROR: ", e);
});

/**
 * Express
 */
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (request, response) => {
  response.send("API WALKING PET");
});

app.use("/api", walkerRouter);
app.use("/api", userRouter);
app.use("/api", adminRouter);
app.use("/api", petRouter);
app.use("/api", dateRouter);
app.use("/api", commentRouter);

const PORT = process.env.PORT || 5000;

// Launch server
app.listen(PORT, () => {
  console.log("Iniatialized server!!");
});
