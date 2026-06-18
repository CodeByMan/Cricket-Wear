const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY || "");
const asyncWrapper = require("../middleWare/asyncWrapper");
const ErrorHandler = require("../utils/errorHandler");

const isRealKey = (key, prefix) => {
  if (typeof key !== "string") return false;
  const value = key.trim();
  if (!value.startsWith(prefix)) return false;
  if (value.includes("your-stripe") || value.includes("your_")) return false;
  return value.length > 20;
};

const isValidStripeSecretKey = (key) => isRealKey(key, "sk_");
const isValidStripePublishableKey = (key) => isRealKey(key, "pk_");

exports.processPayment = asyncWrapper(async (req, res, next) => {
  if (!isValidStripeSecretKey(process.env.STRIPE_SECRET_KEY)) {
    return next(new ErrorHandler("Stripe secret key is not configured", 503));
  }

  const amount = Number(req.body.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return next(new ErrorHandler("A valid payment amount is required", 400));
  }

  const myPayment = await stripe.paymentIntents.create({
    amount,
    currency: "pkr",
    metadata: {
      company: "Cricket Wear Store",
      developer: "Muhammad Ali Nawaz",
      userId: req.user?.id?.toString() || "guest",
    },
  });

  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

exports.sendStripeApiKey = asyncWrapper(async (req, res) => {
  const stripeApiKey = isValidStripePublishableKey(process.env.STRIPE_API_KEY)
    ? process.env.STRIPE_API_KEY
    : "";

  res.status(200).json({ stripeApiKey });
});
