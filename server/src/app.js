require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

//Routes
const exerciseRoutes = require("./routes/exerciseRoutes");

app.use("/api/exercises", exerciseRoutes);

const validationRoutes = require("./routes/validationRoutes");

app.use("/api/validate", validationRoutes);

const feedbackRoutes = require("./routes/feedbackRoutes");

app.use("/api/feedback", feedbackRoutes);

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const statsRoutes = require("./routes/statsRoutes");

app.use("/api/stats", statsRoutes);

const historyRoutes = require("./routes/historyRoutes");

app.use("/api/history", historyRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

module.exports = app;
