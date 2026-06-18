const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const userModel = require("../model/userModel");
const ProductModel = require("../model/ProductModel");
const { users, products } = require("../data/seedData");

dotenv.config({ path: path.join(__dirname, "..", "config", "config.env") });

const mongoUri = process.env.MONGO_URI || process.env.DB_LINK;

const connectDB = async () => {
  if (!mongoUri) throw new Error("MONGO_URI or DB_LINK is required for seeding.");
  await mongoose.connect(mongoUri);
};

const importData = async () => {
  await connectDB();
  await userModel.deleteMany({ email: { $in: users.map((user) => user.email) } });
  const createdUsers = await userModel.create(users);
  const adminUser = createdUsers.find((user) => user.role === "admin");

  await ProductModel.deleteMany({ name: { $in: products.map((product) => product.name) } });
  const productsWithAdmin = products.map((product) => ({ ...product, user: adminUser._id }));
  await ProductModel.create(productsWithAdmin);

  console.log("✅ Seed data imported successfully");
  console.log("Admin: admin@muhammadalidev.com / Admin@12345");
  console.log("User : user@muhammadalidev.com / User@12345");
  await mongoose.disconnect();
};

const destroyData = async () => {
  await connectDB();
  await ProductModel.deleteMany({ name: { $in: products.map((product) => product.name) } });
  await userModel.deleteMany({ email: { $in: users.map((user) => user.email) } });
  console.log("✅ Seed data removed successfully");
  await mongoose.disconnect();
};

if (process.argv.includes("--destroy")) {
  destroyData().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
} else {
  importData().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
