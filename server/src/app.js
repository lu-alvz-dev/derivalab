const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

//Routes
const exerciseRoutes = require("./routes/exerciseRoutes");

app.use("/api/exercises", exerciseRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

module.exports = app;
