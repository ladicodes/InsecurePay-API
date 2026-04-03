const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payment");
const transactionRoutes = require("./routes/transactions");

const config = require("./config");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Routes
app.use("/auth", authRoutes);
app.use("/payment", authenticateToken, paymentRoutes);
app.use("/transactions", authenticateToken, transactionRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    service: "InsecurePay API",
    env: config.appEnv,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});