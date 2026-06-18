const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.DB_LINK;

  if (!mongoUri) {
    throw new Error("MongoDB connection string is missing. Set MONGO_URI or DB_LINK.");
  }

  try {
    console.log("Connecting to MongoDB...");
    const data = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB connected successfully to: ${data.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
