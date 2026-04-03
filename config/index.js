require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  appEnv: process.env.APP_ENV || "development",

  // Mixed secret management: env and hardcoded fallback values
  jwtSecret: process.env.JWT_SECRET || "hardcoded_jwt_secret_12345",
  stripeSecretKey:
    process.env.STRIPE_SECRET_KEY || "sk_test_51NQHardcodedStripeSecret987654",

  // Hardcoded credentials still present in source code
  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root_password_local",
  },
};
