import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";

import { Avatar, Button, Typography } from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CollectionsIcon from "@mui/icons-material/Collections";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import InfoIcon from "@mui/icons-material/Info";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import Sidebar from "./Siderbar";
import Navbar from "./Navbar";

import { createProduct, clearErrors } from "../../actions/productAction";
import { NEW_PRODUCT_RESET } from "../../constants/productsConstatns";

import "./NewProduct.css";

const categories = [
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
];

function NewProduct() {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const fileInputRef = useRef(null);

  const { loading, error, success } = useSelector(
    (state) => state.addNewProduct
  );

  const [toggle, setToggle] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState("");
  const [info, setInfo] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const toggleHandler = () => {
    setToggle((prev) => !prev);
  };

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files || []);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert.error("Product name is required");
      return;
    }

    if (!price || Number(price) <= 0) {
      alert.error("Valid product price is required");
      return;
    }

    if (Stock === "" || Number(Stock) < 0) {
      alert.error("Valid stock quantity is required");
      return;
    }

    if (!info.trim()) {
      alert.error("Product info is required");
      return;
    }

    if (!category) {
      alert.error("Please choose product category");
      return;
    }

    if (!description.trim()) {
      alert.error("Product description is required");
      return;
    }

    if (images.length === 0) {
      alert.error("Please upload at least one product image");
      return;
    }

    const myForm = new FormData();

    myForm.set("name", name.trim());
    myForm.set("price", price);
    myForm.set("description", description.trim());
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("info", info.trim());

    images.forEach((currImg) => {
      myForm.append("images", currImg);
    });

    dispatch(createProduct(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
      history.push("/admin/dashboard");
    }
  }, [dispatch, alert, error, history, success]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) {
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggle]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="New Product" />

          <main className="newProductPage">
            <aside
              className={
                toggle
                  ? "newProductSidebar newProductSidebarOpen"
                  : "newProductSidebar"
              }
            >
              <Sidebar />
            </aside>

            <section className="newProductMain">
              <div className="newProductNavbar">
                <Navbar toggleHandler={toggleHandler} />
              </div>

              <section className="newProductHero">
                <div className="newProductHeroContent">
                  <Typography component="p" className="newProductBadge">
                    Cricket Wear Admin
                  </Typography>

                  <Typography component="h1" className="newProductTitle">
                    Create Product
                  </Typography>

                  <Typography component="p" className="newProductSubtitle">
                    Add a new cricket product with correct price, stock,
                    category, description, and images.
                  </Typography>
                </div>

                <Avatar className="newProductHeroIcon">
                  <AddCircleOutlineIcon />
                </Avatar>
              </section>

              <form
                className="newProductFormCard"
                encType="multipart/form-data"
                onSubmit={createProductSubmitHandler}
                noValidate
              >
                <div className="newProductFormHeader">
                  <div className="newProductFormIcon">
                    <ShoppingCartOutlinedIcon />
                  </div>

                  <div className="newProductHeaderText">
                    <Typography component="h2" className="newProductFormTitle">
                      Product Information
                    </Typography>

                    <Typography component="p" className="newProductFormText">
                      Fill all required fields carefully before creating the
                      product.
                    </Typography>
                  </div>
                </div>

                <div className="newProductGrid">
                  <div className="newProductField">
                    <label htmlFor="product-name">Product Name</label>

                    <div className="newProductInputWrap">
                      <input
                        id="product-name"
                        type="text"
                        placeholder="Enter product name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />

                      <ShoppingCartOutlinedIcon className="newProductFieldIcon" />
                    </div>
                  </div>

                  <div className="newProductField">
                    <label htmlFor="product-price">Price</label>

                    <div className="newProductInputWrap">
                      <input
                        id="product-price"
                        type="number"
                        min="1"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />

                      <AttachMoneyIcon className="newProductFieldIcon" />
                    </div>
                  </div>

                  <div className="newProductField">
                    <label htmlFor="product-stock">Stock</label>

                    <div className="newProductInputWrap">
                      <input
                        id="product-stock"
                        type="number"
                        min="0"
                        placeholder="Enter stock quantity"
                        value={Stock}
                        onChange={(e) => setStock(e.target.value)}
                      />

                      <StorageIcon className="newProductFieldIcon" />
                    </div>
                  </div>

                  <div className="newProductField">
                    <label htmlFor="product-info">Product Info</label>

                    <div className="newProductInputWrap">
                      <input
                        id="product-info"
                        type="text"
                        placeholder="Short product info"
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                      />

                      <InfoIcon className="newProductFieldIcon" />
                    </div>
                  </div>

                  <div className="newProductField">
                    <label htmlFor="product-category">Category</label>

                    <div className="newProductInputWrap newProductSelectWrap">
                      <select
                        id="product-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">Choose Category</option>

                        {categories.map((cate) => (
                          <option key={cate} value={cate}>
                            {cate}
                          </option>
                        ))}
                      </select>

                      <CategoryOutlinedIcon className="newProductFieldIcon" />
                    </div>
                  </div>

                  <div className="newProductUploadBox">
                    <div className="newProductUploadIcon">
                      <CollectionsIcon />
                    </div>

                    <div className="newProductUploadContent">
                      <Typography component="h3" className="newProductUploadTitle">
                        Product Images
                      </Typography>

                      <Typography component="p" className="newProductUploadText">
                        Upload one or multiple product images.
                      </Typography>

                      <input
                        type="file"
                        name="images"
                        accept="image/*"
                        onChange={createProductImagesChange}
                        multiple
                        ref={fileInputRef}
                        className="newProductFileInput"
                      />

                      <Button
                        type="button"
                        variant="contained"
                        className="newProductUploadButton"
                        startIcon={<CloudUploadIcon />}
                        onClick={handleImageUpload}
                      >
                        Upload Images
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="newProductField newProductDescriptionField">
                  <label htmlFor="product-description">
                    Product Description
                  </label>

                  <div className="newProductTextareaWrap">
                    <textarea
                      id="product-description"
                      placeholder="Write complete product description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                    />

                    <DescriptionIcon className="newProductTextareaIcon" />
                  </div>
                </div>

                {imagesPreview.length > 0 && (
                  <div className="newProductPreviewArea">
                    {imagesPreview.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product Preview ${index + 1}`}
                        className="newProductPreviewImage"
                      />
                    ))}
                  </div>
                )}

                <div className="newProductActions">
                  <Button
                    variant="contained"
                    className="newProductSubmitButton"
                    type="submit"
                    disabled={loading}
                  >
                    Create Product
                  </Button>
                </div>
              </form>
            </section>
          </main>
        </>
      )}
    </>
  );
}

export default NewProduct;