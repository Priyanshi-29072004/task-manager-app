const Task = require("../models/Task");

const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });
  res.json(tasks);
};

const createTask = async (req, res) => {
  const { title, description, status } = req.body;

  const task = await Task.create({
    title,
    description,
    status,
    userId: req.user._id,
  });
  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

  if (!task)
    return res.status(404).json({ message: "Task not found or unauthorized" });

  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
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
