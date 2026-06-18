const path = require("path");
const dotenv = require("dotenv");

// Always load env relative to this file, so npm start works from any folder.
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

const app = require("./app");
const connectDB = require("./db/connectDB");
const cloudinary = require("cloudinary");

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});

const requiredEnvVars = ["JWT_SECRET"];
const databaseVars = ["MONGO_URI", "DB_LINK"];
const missingRequired = requiredEnvVars.filter((envVar) => !process.env[envVar]);
const hasDatabaseConnection = databaseVars.some((envVar) => Boolean(process.env[envVar]));

console.log("=== ENVIRONMENT VALIDATION ===");

if (missingRequired.length > 0 || !hasDatabaseConnection) {
  console.error("❌ Missing required environment variables:");
  if (missingRequired.length > 0) console.error("  Required:", missingRequired);
  if (!hasDatabaseConnection) console.error("  Database: Need either MONGO_URI or DB_LINK");
  console.error("Please check backend/config/config.env");
  process.exit(1);
}

const hasCloudinary = Boolean(process.env.CLOUDINARY_NAME && process.env.API_KEY && process.env.API_SECRET);
if (hasCloudinary) {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
} else {
  console.log("ℹ️ Cloudinary is not configured. Local/default image fallback is enabled.");
}

console.log("✅ Environment validation completed");
console.log("===============================");

connectDB();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err.message);
  server.close(() => process.exit(1));
});
