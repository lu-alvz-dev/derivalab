require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// Middlewares
app.use(helmet());

const allowedOrigins = ["http://localhost:5173"];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json({ limit: "10kb" }));

// Routes
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

const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/api/dashboard", dashboardRoutes);

const studentDashboardRoutes = require("./routes/studentDashboardRoutes");

app.use("/api/student-dashboard", studentDashboardRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    message: "DerivaLab API",
    status: "running",
  });
});

module.exports = app;
