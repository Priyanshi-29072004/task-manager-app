const Task = require("../models/Task");

const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });
  res.json(tasks);
};

const createTask = async (req, res) => {
  const { title, description, status, date } = req.body;  

  try {
    const task = await Task.create({
      title,
      description,
      status,
      date: date || new Date().toISOString(), 
      createdAt: new Date().toISOString(),
      userId: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const updateTask = async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!task)
    return res.status(404).json({ message: "Task not found or unauthorized" });

  res.json({ message: "Task deleted" });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
