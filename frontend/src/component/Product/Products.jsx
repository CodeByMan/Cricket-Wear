import React, { useEffect } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import { useRouteMatch } from "react-router-dom";
import MetaData from "../layouts/MataData/MataData";
import { clearErrors, getProduct } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard";
import Pagination from "@mui/material/Pagination";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InventoryIcon from "@mui/icons-material/Inventory";
import TuneIcon from "@mui/icons-material/Tune";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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

const minPriceOptions = [0, 1000, 2500, 5000, 10000, 15000, 20000];
const maxPriceOptions = [10000, 20000, 30000, 50000, 75000, 100000];

function Products() {
  const match = useRouteMatch();
  const keyword = match.params.keyword || "";

  const dispatch = useDispatch();
  const alert = useAlert();

  const { products, loading, productsCount, error, resultPerPage } =
    useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [price, setPrice] = React.useState([0, 100000]);
  const [category, setCategory] = React.useState("");
  const [ratings, setRatings] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedRating, setSelectedRating] = React.useState("all");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, ratings, category, error, alert]);

  const setCurrentPageNoHandler = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
    setCurrentPage(1);
  };

  const handleMinPriceChange = (event) => {
    const newMin = Number(event.target.value);
    const newMax = price[1];

    setPrice([newMin, newMin > newMax ? newMin : newMax]);
    setCurrentPage(1);
  };

  const handleMaxPriceChange = (event) => {
    const newMax = Number(event.target.value);
    const newMin = price[0];

    setPrice([newMin > newMax ? 0 : newMin, newMax]);
    setCurrentPage(1);
  };

  const handleCategoryChange = (selected) => {
    if (selectedCategory === selected) {
      setCategory("");
      setSelectedCategory("");
    } else {
      setCategory(selected);
      setSelectedCategory(selected);
    }

    setCurrentPage(1);
  };

  const handleRatingChange = (event) => {
    const value = event.target.value;

    setSelectedRating(value);
    setRatings(value === "all" ? 0 : Number(value));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setCurrentPage(1);
    setPrice([0, 100000]);
    setCategory("");
    setSelectedCategory("");
    setRatings(0);
    setSelectedRating("all");
  };

  const hasProducts = products && products.length > 0;
  const totalPages = Math.max(
    1,
    Math.ceil((productsCount || 0) / (resultPerPage || 6))
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products - Cricket Wear" />

          <main className="productPage">
            <section className="productPageHeader">
              <Typography component="p" className="productPageBadge">
                Cricket Wear Store
              </Typography>

              <Typography component="h1" className="productPageTitle">
                Our Products
              </Typography>

              <Typography component="p" className="productPageSubtitle">
                Browse premium cricket bats, kits, gloves, pads, balls,
                accessories, and sportswear.
              </Typography>
            </section>

            <div className="prodcutPageTop">
              <aside className="filterBox">
                <div className="filterTitleRow">
                  <div>
                    <Typography component="h2" className="filterMainTitle">
                      Filters
                    </Typography>
                    <Typography component="p" className="filterSubTitle">
                      Refine your cricket gear
                    </Typography>
                  </div>

                  <TuneIcon className="filterIcon" />
                </div>

                <div className="filter_divider"></div>

                <div className="priceFilter">
                  <Typography component="h3" className="filterSectionTitle">
                    Price Range
                  </Typography>

                  <div className="priceSlider">
                    <Slider
                      value={price}
                      onChange={priceHandler}
                      min={0}
                      max={100000}
                      step={500}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                    />
                  </div>

                  <div className="priceSelectors">
                    <div className="priceSelector">
                      <Select
                        value={price[0]}
                        onChange={handleMinPriceChange}
                        className="priceOption"
                        IconComponent={ArrowDropDownIcon}
                        MenuProps={{
                          PaperProps: {
                            className: "productMenuPaper",
                          },
                        }}
                      >
                        {minPriceOptions.map((value) => (
                          <MenuItem
                            key={value}
                            value={value}
                            className="menu_item"
                          >
                            PKR {value.toLocaleString("en-PK")}
                          </MenuItem>
                        ))}
                      </Select>

                      <span className="toText">to</span>

                      <Select
                        value={price[1]}
                        onChange={handleMaxPriceChange}
                        className="priceOption"
                        IconComponent={ArrowDropDownIcon}
                        MenuProps={{
                          PaperProps: {
                            className: "productMenuPaper",
                          },
                        }}
                      >
                        {maxPriceOptions.map((value) => (
                          <MenuItem
                            key={value}
                            value={value}
                            className="menu_item"
                          >
                            PKR {value.toLocaleString("en-PK")}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="filter_divider"></div>

                <div className="categoriesFilter">
                  <Typography component="h3" className="filterSectionTitle">
                    Categories
                  </Typography>

                  <ul className="categoryBox">
                    {categories.map((item, index) => (
                      <li className="category-link" key={index}>
                        <label
                          htmlFor={`category-${index}`}
                          className="category-label"
                        >
                          <input
                            type="checkbox"
                            id={`category-${index}`}
                            className="category-checkbox"
                            value={item}
                            checked={item === selectedCategory}
                            onChange={() => handleCategoryChange(item)}
                          />
                          <span>{item}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="filter_divider"></div>

                <div className="ratingsFilter">
                  <Typography component="h3" className="filterSectionTitle">
                    Ratings
                  </Typography>

                  <RadioGroup
                    value={selectedRating}
                    onChange={handleRatingChange}
                    className="ratingsBox"
                  >
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label="All Ratings"
                    />
                    <FormControlLabel
                      value="4"
                      control={<Radio />}
                      label="4★ & above"
                    />
                    <FormControlLabel
                      value="3"
                      control={<Radio />}
                      label="3★ & above"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="2★ & above"
                    />
                  </RadioGroup>
                </div>

                <div className="filter_divider"></div>

                <Button
                  className="clearFiltersBtn"
                  startIcon={<RestartAltIcon />}
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </aside>

              <section className="productsContent">
                <div className="productsTopBar">
                  <div>
                    <Typography component="h2" className="productsResultTitle">
                      Cricket Products
                    </Typography>

                    <Typography component="p" className="productsResultText">
                      Showing {hasProducts ? products.length : 0} products
                    </Typography>
                  </div>
                </div>

                {hasProducts ? (
                  <div
                    className={
                      products.length < 2 ? "products productsSingle" : "products"
                    }
                  >
                    {products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="noProductsBox">
                    <InventoryIcon className="noProductsIcon" />

                    <Typography
                      variant="h5"
                      component="h2"
                      className="noProductsHeading"
                    >
                      Product Not Found
                    </Typography>

                    <Typography variant="body1" className="noProductsText">
                      No product matched your current search or filter.
                    </Typography>

                    <Button className="clearFiltersBtn" onClick={clearFilters}>
                      Reset Filters
                    </Button>
                  </div>
                )}

                {hasProducts && totalPages > 1 && (
                  <div className="paginationBox">
                    <Pagination
                      page={currentPage || 1}
                      count={totalPages}
                      onChange={setCurrentPageNoHandler}
                      color="primary"
                      shape="rounded"
                    />
                  </div>
                )}
              </section>
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default Products;