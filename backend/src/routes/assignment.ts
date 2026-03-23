import express from "express";
import Assignment from "../models/Assignment";

const router = express.Router();

// CREATE ASSIGNMENT
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newAssignment = new Assignment(data);
    await newAssignment.save();

    res.json({
      message: "Assignment saved",
      data: newAssignment,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  const data = await Assignment.find();
  res.json(data);
});

export default router;