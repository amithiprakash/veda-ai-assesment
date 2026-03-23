import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import generateRoute from "./routes/generate";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/generate", generateRoute);

// DB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/veda")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
