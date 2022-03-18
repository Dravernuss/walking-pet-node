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
import "dotenv/config";
import cors from "cors";

/**
 * Mongoose
 */

// Connect to db
const dbConnection = process.env.DB_STRING_CONNECTION;
await mongoose.connect(dbConnection);
console.log("conexión exitosa con la base de datos");
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
