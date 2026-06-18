const ProductModel = require("../model/ProductModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncWrapper = require("../middleWare/asyncWrapper");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

const hasCloudinaryConfig = () => Boolean(process.env.CLOUDINARY_NAME && process.env.API_KEY && process.env.API_SECRET);
const defaultProductImage = { product_id: "default-product", url: "/seed-images/default-product.png" };

const normalizeImages = (images) => {
  if (!images) return [];
  return Array.isArray(images) ? images : [images];
};

const uploadImages = async (images) => {
  const normalized = normalizeImages(images).filter(Boolean);

  if (!hasCloudinaryConfig()) {
    return normalized.length > 0
      ? normalized.map((img, index) => ({ product_id: `local-image-${Date.now()}-${index}`, url: img.startsWith("data:") ? defaultProductImage.url : img }))
      : [defaultProductImage];
  }

  const uploadedImages = [];
  for (const img of normalized) {
    const result = await cloudinary.v2.uploader.upload(img, { folder: "Products" });
    uploadedImages.push({ product_id: result.public_id, url: result.secure_url });
  }

  return uploadedImages.length > 0 ? uploadedImages : [defaultProductImage];
};

exports.createProduct = asyncWrapper(async (req, res) => {
  req.body.user = req.user.id;
  req.body.images = await uploadImages(req.body.images);

  const data = await ProductModel.create(req.body);

  res.status(201).json({ success: true, data });
});

exports.getAllProducts = asyncWrapper(async (req, res) => {
  const resultPerPage = Number(req.query.limit) || 12;
  const productsCount = await ProductModel.countDocuments();

  const apiFeature = new ApiFeatures(ProductModel.find(), req.query).search().filter();
  let products = await apiFeature.query.clone();
  const filteredProductCount = products.length;

  apiFeature.Pagination(resultPerPage);
  products = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductCount,
  });
});

exports.getAllProductsAdmin = asyncWrapper(async (req, res) => {
  const products = await ProductModel.find();
  res.status(200).json({ success: true, products });
});

exports.updateProduct = asyncWrapper(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  if (req.body.images) {
    if (hasCloudinaryConfig()) {
      for (const image of product.images) {
        if (image.product_id && !image.product_id.startsWith("default") && !image.product_id.startsWith("local")) {
          await cloudinary.v2.uploader.destroy(image.product_id);
        }
      }
    }
    req.body.images = await uploadImages(req.body.images);
  }

  product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, product });
});

exports.deleteProduct = asyncWrapper(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  if (hasCloudinaryConfig()) {
    for (const image of product.images) {
      if (image.product_id && !image.product_id.startsWith("default") && !image.product_id.startsWith("local")) {
        await cloudinary.v2.uploader.destroy(image.product_id);
      }
    }
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

exports.getProductDetails = asyncWrapper(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    Product: product,
  });
});

exports.createProductReview = asyncWrapper(async (req, res, next) => {
  const { ratings, comment, productId, title, recommend } = req.body;
  const product = await ProductModel.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const review = {
    userId: req.user._id,
    name: req.user.name,
    ratings: Number(ratings),
    title,
    comment,
    recommend,
    avatar: req.user.avatar?.url || "/seed-images/default-avatar.png",
  };

  const existingReview = product.reviews.find((rev) => rev.userId.toString() === req.user._id.toString());

  if (existingReview) {
    existingReview.ratings = review.ratings;
    existingReview.title = review.title;
    existingReview.comment = review.comment;
    existingReview.recommend = review.recommend;
    existingReview.avatar = review.avatar;
  } else {
    product.reviews.push(review);
  }

  product.numOfReviews = product.reviews.length;
  product.ratings = product.reviews.reduce((sum, rev) => sum + Number(rev.ratings || 0), 0) / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});

exports.getProductReviews = asyncWrapper(async (req, res, next) => {
  const product = await ProductModel.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

exports.deleteReview = asyncWrapper(async (req, res, next) => {
  const product = await ProductModel.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());
  const ratings = reviews.length === 0
    ? 0
    : reviews.reduce((sum, rev) => sum + Number(rev.ratings || 0), 0) / reviews.length;

  await ProductModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews: reviews.length,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ success: true });
});
