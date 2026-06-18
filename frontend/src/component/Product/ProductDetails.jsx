import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { IconButton, Input, Button } from "@mui/material";
import Rating from "@mui/material/Rating";

import {
  generateDiscountedPrice,
  calculateDiscount,
  dispalyMoney,
} from "../DisplayMoney/DisplayMoney";

import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import useActive from "../hook/useActive";
import ReviewCard from "./ReviewCard";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MataData/MataData";
import { addItemToCart } from "../../actions/cartAction";
import CricketBallLoader from "../layouts/loader/Loader";
import { PRODUCT_DETAILS_RESET } from "../../constants/productsConstatns";
import { normalizeImageUrl } from "../../utils/imageUrl";

const ProductDetails = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [quantity, setQuantity] = useState(1);
  const [previewImg, setPreviewImg] = useState("");

  const { handleActive, activeClass } = useActive(0);

  const { product = {}, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));

    return () => {
      dispatch({ type: PRODUCT_DETAILS_RESET });
    };
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setPreviewImg(normalizeImageUrl(product.images[0].url));
      handleActive(0);
      setQuantity(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?._id]);

  const handleAddItem = () => {
    dispatch(addItemToCart(match.params.id, quantity));
    alert.success("Item Added To Cart");
  };

  const handlePreviewImg = (images, i) => {
    setPreviewImg(normalizeImageUrl(images[i]?.url));
    handleActive(i);
  };

  const increaseQuantityHandler = () => {
    if (product.Stock <= quantity) {
      return;
    }

    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantityHandler = () => {
    if (quantity <= 1) {
      return;
    }

    setQuantity((prev) => prev - 1);
  };

  const productPrice = Number(product.price) || 0;
  const finalPrice = generateDiscountedPrice(productPrice);
  const discountedPrice = productPrice - Number(finalPrice);
  const newPrice = dispalyMoney(finalPrice);
  const oldPrice = dispalyMoney(productPrice);
  const savedPrice = dispalyMoney(discountedPrice);
  const savedDiscount = productPrice
    ? Math.round(calculateDiscount(discountedPrice, productPrice))
    : 0;

  const productImages =
    product.images && product.images.length > 0 ? product.images : [];

  return (
    <>
      {loading ? (
        <CricketBallLoader />
      ) : (
        <div className="prodcutDetialsContainer">
          <MetaData title={product.name || "Product Details"} />

          <section id="product_details" className="section">
            <div className="product_container">
              <div className="prod_details_wrapper">
                <div className="prod_details_left_col">
                  <div className="prod_details_tabs">
                    {productImages.map((img, i) => (
                      <button
                        type="button"
                        key={i}
                        className={`tabs_item ${activeClass(i)}`}
                        onClick={() => handlePreviewImg(productImages, i)}
                      >
                        <img
                          src={normalizeImageUrl(img.url)}
                          alt={`${product.name || "Product"} thumbnail ${i + 1}`}
                        />
                      </button>
                    ))}
                  </div>

                  <figure className="prod_details_img">
                    {previewImg ? (
                      <img src={previewImg} alt={product.name || "Product"} />
                    ) : (
                      <div className="product_image_placeholder">
                        No Image Available
                      </div>
                    )}
                  </figure>
                </div>

                <div className="prod_details_right_col_001">
                  <div className="productDetailsHeader">
                    <p className="productCategoryTag">
                      {product.category || "Cricket Gear"}
                    </p>

                    <h1 className="prod_details_title">{product.name}</h1>

                    {product.info && (
                      <h4 className="prod_details_info">{product.info}</h4>
                    )}
                  </div>

                  <div className="prod_details_ratings">
                    <Rating
                      value={Number(product.ratings) || 0}
                      precision={0.5}
                      readOnly
                      className="ratingStars"
                    />

                    <span className="ratingDivider">|</span>

                    <Link to="#" className="ratingLink">
                      {product.numOfReviews || 0} Ratings
                    </Link>
                  </div>

                  <div className="prod_details_price">
                    <div className="price_box">
                      <h2 className="price">
                        {newPrice}
                        <small className="del_price">
                          <del>{oldPrice}</del>
                        </small>
                      </h2>

                      <p className="saved_price">
                        You save: {savedPrice} ({savedDiscount}%)
                      </p>

                      <span className="tax_txt">(Inclusive of all taxes)</span>
                    </div>

                    <div className="badge">
                      {product.Stock >= 1 ? (
                        <span className="instock">
                          <DoneIcon /> In Stock
                        </span>
                      ) : (
                        <span className="outofstock">
                          <CloseIcon /> Out of Stock
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="seprator2"></div>

                  <div className="productDescription">
                    <div className="productDiscriptiopn_text">
                      <h4>Description</h4>
                      <p>{product.description}</p>
                    </div>

                    <div className="prod_details_offers">
                      <h4>Offers and Discounts</h4>

                      <ul>
                        <li>No Cost EMI on Credit Card</li>
                        <li>Pay Later & Avail Cashback</li>
                      </ul>
                    </div>

                    <div className="deliveryText">
                      <LocalShippingOutlinedIcon />
                      <span>We deliver! Just say when and how.</span>
                    </div>
                  </div>

                  <div className="seprator2"></div>

                  <div className="prod_details_additem">
                    <div className="quantityBox">
                      <h5>QTY</h5>

                      <div className="additem">
                        <IconButton
                          onClick={decreaseQuantityHandler}
                          className="additem_decrease"
                          disabled={quantity <= 1}
                        >
                          <RemoveIcon />
                        </IconButton>

                        <Input
                          readOnly
                          type="number"
                          value={quantity}
                          className="qtyInput"
                          disableUnderline
                        />

                        <IconButton
                          onClick={increaseQuantityHandler}
                          className="additem_increase"
                          disabled={product.Stock <= quantity}
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                    </div>

                    <Button
                      variant="contained"
                      className="prod_details_addtocart_btn"
                      onClick={handleAddItem}
                      disabled={product.Stock <= 0}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="reviewCard">
            <ReviewCard product={product} />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;