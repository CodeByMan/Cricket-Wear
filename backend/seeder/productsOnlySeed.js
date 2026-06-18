const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const ProductModel = require("../model/ProductModel");
const userModel = require("../model/userModel");

dotenv.config({ path: path.join(__dirname, "..", "config", "config.env") });

const mongoUri = process.env.MONGO_URI || process.env.DB_LINK;

const products = [
  {
    name: "CW Pro English Willow Cricket Bat",
    description:
      "Premium English willow cricket bat built for serious match performance, clean stroke play, and strong pickup.",
    info: "Balanced pickup, thick edges, curved blade, premium grip, and match-ready profile.",
    price: 28999,
    ratings: 4.8,
    images: [{ product_id: "cw-pro-english-willow-bat", url: "/seed-images/pro-bat.jpg" }],
    category: "Bats",
    Stock: 18,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW Power Kashmir Willow Cricket Bat",
    description:
      "Durable Kashmir willow cricket bat for practice, tape ball, hard ball training, and beginner-level matches.",
    info: "Strong blade, comfortable handle, reliable sweet spot, and excellent value for cricket learners.",
    price: 11999,
    ratings: 4.4,
    images: [{ product_id: "cw-power-kashmir-willow-bat", url: "/seed-images/pro-bat.jpg" }],
    category: "Bats",
    Stock: 26,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW Academy Cricket Kit Bag",
    description:
      "Spacious cricket kit bag designed for bats, pads, gloves, shoes, helmet, clothing, and daily training gear.",
    info: "Large storage capacity, strong zip, side pockets, shoulder strap, and academy-ready build.",
    price: 8499,
    ratings: 4.5,
    images: [{ product_id: "cw-academy-kit-bag", url: "/seed-images/default-product.png" }],
    category: "Bags",
    Stock: 22,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW Elite Wheelie Cricket Bag",
    description:
      "Premium wheelie cricket bag for players who carry full match gear and need easy movement.",
    info: "Wheels, reinforced base, multiple compartments, bat sleeves, and professional travel storage.",
    price: 13999,
    ratings: 4.7,
    images: [{ product_id: "cw-elite-wheelie-bag", url: "/seed-images/default-product.png" }],
    category: "Bags",
    Stock: 12,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW Match Red Leather Cricket Ball",
    description:
      "High-quality red leather cricket ball for club matches, net practice, and hard-ball sessions.",
    info: "Raised seam, durable leather, consistent bounce, and strong shape retention.",
    price: 2499,
    ratings: 4.6,
    images: [{ product_id: "cw-match-red-leather-ball", url: "/seed-images/default-product.png" }],
    category: "Balls",
    Stock: 60,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW White Leather Cricket Ball",
    description:
      "White leather cricket ball for limited-over matches, night practice, and training sessions.",
    info: "Bright white finish, strong seam, reliable swing, and durable stitching.",
    price: 2799,
    ratings: 4.5,
    images: [{ product_id: "cw-white-leather-ball", url: "/seed-images/default-product.png" }],
    category: "Balls",
    Stock: 45,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW Pro Batting Gloves",
    description:
      "Comfortable batting gloves with impact protection, soft feel, and strong grip for confident batting.",
    info: "Flexible fingers, padded protection, breathable lining, and anti-slip palm grip.",
    price: 6499,
    ratings: 4.7,
    images: [{ product_id: "cw-pro-batting-gloves", url: "/seed-images/default-product.png" }],
    category: "Batting Gloves",
    Stock: 30,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW Junior Batting Gloves",
    description:
      "Lightweight batting gloves designed for junior players, school cricket, and academy practice.",
    info: "Soft padding, flexible fit, lightweight design, and comfortable grip for young players.",
    price: 3999,
    ratings: 4.4,
    images: [{ product_id: "cw-junior-batting-gloves", url: "/seed-images/default-product.png" }],
    category: "Batting Gloves",
    Stock: 35,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW Pro Batting Pads",
    description:
      "Protective batting pads made for match play, net sessions, and high-speed bowling protection.",
    info: "Lightweight foam, strong knee roll, durable straps, and comfortable inner padding.",
    price: 8999,
    ratings: 4.6,
    images: [{ product_id: "cw-pro-batting-pads", url: "/seed-images/default-product.png" }],
    category: "Batting Pads",
    Stock: 20,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW Junior Batting Pads",
    description:
      "Junior batting pads with reliable protection, easy straps, and comfortable fit for young cricketers.",
    info: "Lightweight build, soft inner lining, strong front shield, and academy training support.",
    price: 5599,
    ratings: 4.3,
    images: [{ product_id: "cw-junior-batting-pads", url: "/seed-images/default-product.png" }],
    category: "Batting Pads",
    Stock: 28,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW Complete Cricket Kit",
    description:
      "Complete cricket kit package for players who need essential batting, protection, and carrying gear.",
    info: "Includes major match essentials for club, academy, and daily cricket training.",
    price: 39999,
    ratings: 4.8,
    images: [{ product_id: "cw-complete-cricket-kit", url: "/seed-images/cricket-kit.jpg" }],
    category: "Cricket Kits",
    Stock: 10,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW Starter Cricket Kit",
    description:
      "Beginner-friendly cricket kit for students, new players, and academy learners starting cricket.",
    info: "Affordable kit bundle with basic cricket gear for training and beginner match practice.",
    price: 21999,
    ratings: 4.5,
    images: [{ product_id: "cw-starter-cricket-kit", url: "/seed-images/cricket-kit.jpg" }],
    category: "Cricket Kits",
    Stock: 16,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW Premium Cricket Helmet",
    description:
      "Strong cricket helmet with front grill protection for batting against fast and spin bowling.",
    info: "Adjustable fit, strong grill, inner padding, and comfortable head protection.",
    price: 9999,
    ratings: 4.6,
    images: [{ product_id: "cw-premium-cricket-helmet", url: "/seed-images/default-product.png" }],
    category: "Helmets",
    Stock: 14,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW Club Cricket Helmet",
    description:
      "Reliable cricket helmet for club players, practice sessions, and academy-level training.",
    info: "Durable shell, protective grill, comfortable padding, and secure adjustable straps.",
    price: 7499,
    ratings: 4.3,
    images: [{ product_id: "cw-club-cricket-helmet", url: "/seed-images/default-product.png" }],
    category: "Helmets",
    Stock: 18,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW Wooden Cricket Stumps Set",
    description:
      "Classic wooden cricket stumps set for ground matches, net practice, and club-level cricket.",
    info: "Three wooden stumps, two bails, strong finish, and suitable for outdoor cricket.",
    price: 3499,
    ratings: 4.4,
    images: [{ product_id: "cw-wooden-cricket-stumps", url: "/seed-images/default-product.png" }],
    category: "Stumps",
    Stock: 32,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW Spring Return Practice Stumps",
    description:
      "Portable spring return stumps for batting drills, bowling practice, and academy training.",
    info: "Flexible spring base, easy setup, reusable training design, and indoor/outdoor support.",
    price: 4999,
    ratings: 4.5,
    images: [{ product_id: "cw-spring-return-stumps", url: "/seed-images/default-product.png" }],
    category: "Stumps",
    Stock: 24,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW Cricket Rubber Spike Shoes",
    description:
      "Comfortable cricket shoes with rubber spikes for grip, balance, and movement on turf surfaces.",
    info: "Cushioned sole, breathable upper, rubber grip, and lightweight match-day comfort.",
    price: 7999,
    ratings: 4.5,
    images: [{ product_id: "cw-rubber-spike-shoes", url: "/seed-images/default-product.png" }],
    category: "Shoes",
    Stock: 25,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW All-Rounder Cricket Shoes",
    description:
      "All-round cricket shoes for batting, bowling, fielding, and regular practice sessions.",
    info: "Comfortable fit, strong outsole, ankle support, and reliable traction.",
    price: 9499,
    ratings: 4.6,
    images: [{ product_id: "cw-all-rounder-shoes", url: "/seed-images/default-product.png" }],
    category: "Shoes",
    Stock: 19,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW Performance Cricket Jersey",
    description:
      "Lightweight cricket jersey made for training, team matches, and warm weather comfort.",
    info: "Breathable fabric, athletic fit, quick-dry feel, and Cricket Wear branding.",
    price: 2999,
    ratings: 4.4,
    images: [{ product_id: "cw-performance-jersey", url: "/seed-images/default-product.png" }],
    category: "Clothing",
    Stock: 40,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW Cricket Training Trouser",
    description:
      "Comfortable cricket training trouser for practice sessions, travel, and match preparation.",
    info: "Flexible fabric, clean fit, lightweight feel, and daily cricket wear comfort.",
    price: 3499,
    ratings: 4.3,
    images: [{ product_id: "cw-training-trouser", url: "/seed-images/default-product.png" }],
    category: "Clothing",
    Stock: 38,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW Cricket Arm Guard",
    description:
      "Protective arm guard for batters facing hard-ball bowling in nets and matches.",
    info: "Lightweight protection, adjustable strap, soft inner padding, and secure fit.",
    price: 2499,
    ratings: 4.2,
    images: [{ product_id: "cw-cricket-arm-guard", url: "/seed-images/cricket-gear.png" }],
    category: "Accessories",
    Stock: 33,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "CW Cricket Thigh Guard",
    description:
      "Comfortable thigh guard for batting protection during practice and competitive cricket.",
    info: "Lightweight shield, adjustable waist strap, inner comfort padding, and strong coverage.",
    price: 3299,
    ratings: 4.4,
    images: [{ product_id: "cw-cricket-thigh-guard", url: "/seed-images/cricket-gear.png" }],
    category: "Accessories",
    Stock: 29,
    numOfReviews: 0,
    reviews: [],
  },
];

const connectDB = async () => {
  if (!mongoUri) {
    throw new Error("MONGO_URI or DB_LINK is missing in backend/config/config.env");
  }

  await mongoose.connect(mongoUri);
  console.log("✅ MongoDB connected");
};

const importProducts = async () => {
  await connectDB();

  const adminUser =
    (await userModel.findOne({ email: "admin@muhammadalidev.com" })) ||
    (await userModel.findOne({ role: "admin" }));

  if (!adminUser) {
    throw new Error(
      "No admin user found. Login/register admin first, or run your user seed once before product seed."
    );
  }

  const productsWithAdmin = products.map((product) => ({
    ...product,
    user: adminUser._id,
    createdAt: new Date(),
  }));

  if (process.argv.includes("--fresh")) {
    await ProductModel.deleteMany({});
    console.log("🗑️ Existing products deleted");
  } else {
    await ProductModel.deleteMany({
      name: { $in: products.map((product) => product.name) },
    });
    console.log("🧹 Old dummy products removed");
  }

  await ProductModel.insertMany(productsWithAdmin);

  console.log(`✅ ${productsWithAdmin.length} dummy products inserted successfully`);
  console.log("✅ Product categories added:");
  console.log([
    "Cricket Kits",
    "Batting Gloves",
    "Batting Pads",
    "Bats",
    "Bags",
    "Helmets",
    "Balls",
    "Stumps",
    "Shoes",
    "Clothing",
    "Accessories",
  ].join(", "));

  await mongoose.disconnect();
  process.exit(0);
};

const destroyProducts = async () => {
  await connectDB();

  await ProductModel.deleteMany({
    name: { $in: products.map((product) => product.name) },
  });

  console.log("✅ Dummy products removed successfully");

  await mongoose.disconnect();
  process.exit(0);
};

if (process.argv.includes("--destroy")) {
  destroyProducts().catch((error) => {
    console.error("❌", error.message);
    process.exit(1);
  });
} else {
  importProducts().catch((error) => {
    console.error("❌", error.message);
    process.exit(1);
  });
}