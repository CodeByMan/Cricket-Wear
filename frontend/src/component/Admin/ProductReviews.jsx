import React, { useEffect, useMemo, useState } from "react";
import "./ProductReviews.css";

import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import {
  getAllreviews,
  clearErrors,
  deleteProductReview,
} from "../../actions/productAction";

import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";

import { DELETE_REVIEW_RESET } from "../../constants/productsConstatns";

import DeleteIcon from "@mui/icons-material/Delete";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function ProductReviews() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [toggle, setToggle] = useState(false);
  const [productId, setProductId] = useState("");

  const { error, reviews = [], loading } = useSelector(
    (state) => state.getAllReview
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReview
  );

  const toggleHandler = () => {
    setToggle((prev) => !prev);
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();

    if (!productId.trim()) {
      alert.error("Please enter a product ID");
      return;
    }

    if (productId.trim().length !== 24) {
      alert.error("Product ID must be 24 characters long");
      return;
    }

    dispatch(getAllreviews(productId.trim()));
  };

  const deleteReviewHandler = (reviewId) => {
    if (!reviewId || !productId.trim()) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (confirmDelete) {
      dispatch(deleteProductReview(reviewId, productId.trim()));
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      dispatch({ type: DELETE_REVIEW_RESET });

      if (productId.trim().length === 24) {
        dispatch(getAllreviews(productId.trim()));
      }
    }
  }, [dispatch, alert, error, deleteError, isDeleted, productId]);

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

  const rows = useMemo(() => {
    return reviews.map((item) => ({
      id: item._id,
      user: item.name || "Unknown User",
      comment: item.comment || "No comment",
      rating: Number(item.ratings || item.rating || 0),
      recommend: item.recommend ? "Yes" : "No",
    }));
  }, [reviews]);

  const averageRating = useMemo(() => {
    if (!rows.length) return 0;

    const total = rows.reduce((sum, item) => sum + Number(item.rating || 0), 0);
    return (total / rows.length).toFixed(1);
  }, [rows]);

  const recommendedCount = rows.filter(
    (item) => item.recommend === "Yes"
  ).length;

  const columns = [
    {
      field: "id",
      headerName: "Review ID",
      minWidth: 230,
      flex: 0.85,
      headerClassName: "reviewColumnHeader",
      renderCell: (params) => {
        return <span className="reviewIdCell">{params.row.id}</span>;
      },
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 180,
      flex: 0.65,
      headerClassName: "reviewColumnHeader",
      renderCell: (params) => {
        return <span className="reviewUserCell">{params.row.user}</span>;
      },
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 320,
      flex: 1,
      headerClassName: "reviewColumnHeader",
      renderCell: (params) => {
        return <span className="reviewCommentCell">{params.row.comment}</span>;
      },
    },
    {
      field: "recommend",
      headerName: "Recommend",
      minWidth: 130,
      flex: 0.45,
      headerClassName: "reviewColumnHeader",
      renderCell: (params) => {
        return (
          <span
            className={
              params.row.recommend === "Yes"
                ? "reviewBadge reviewGreenBadge"
                : "reviewBadge reviewRedBadge"
            }
          >
            {params.row.recommend}
          </span>
        );
      },
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 130,
      flex: 0.45,
      headerClassName: "reviewColumnHeader",
      renderCell: (params) => {
        const rating = Number(params.row.rating || 0);

        return (
          <span
            className={
              rating >= 3
                ? "reviewRatingBadge reviewGreenBadge"
                : "reviewRatingBadge reviewRedBadge"
            }
          >
            <StarRoundedIcon />
            {rating}
          </span>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 130,
      flex: 0.4,
      sortable: false,
      filterable: false,
      headerClassName: "reviewColumnHeader reviewActionHeader",
      renderCell: (params) => {
        const reviewId = params.row.id || params.id;

        return (
          <div className="reviewActionButtons">
            <button
              type="button"
              className="reviewDeleteButton"
              onClick={() => deleteReviewHandler(reviewId)}
              aria-label="Delete review"
              title="Delete Review"
            >
              <DeleteIcon />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="All Reviews" />

          <main className="reviewsPage">
            <aside
              className={
                toggle ? "reviewsSidebar reviewsSidebarOpen" : "reviewsSidebar"
              }
            >
              <Sidebar />
            </aside>

            <section className="reviewsMain">
              <div className="reviewsNavbar">
                <Navbar toggleHandler={toggleHandler} />
              </div>

              <section className="reviewsHero">
                <div className="reviewsHeroContent">
                  <p className="reviewsBadge">Cricket Wear Admin</p>

                  <h1>Product Reviews</h1>

                  <p>
                    Search a product by ID, view customer reviews, ratings,
                    recommendations, and remove unwanted feedback.
                  </p>
                </div>

                <div className="reviewsHeroIcon">
                  <ReviewsOutlinedIcon />
                </div>
              </section>

              <section className="reviewsStats">
                <div className="reviewStatCard">
                  <div className="reviewStatIcon">
                    <RateReviewOutlinedIcon />
                  </div>

                  <div>
                    <span>Total Reviews</span>
                    <strong>{rows.length}</strong>
                  </div>
                </div>

                <div className="reviewStatCard">
                  <div className="reviewStatIcon">
                    <StarRateIcon />
                  </div>

                  <div>
                    <span>Average Rating</span>
                    <strong>{averageRating}</strong>
                  </div>
                </div>

                <div className="reviewStatCard">
                  <div className="reviewStatIcon">
                    <CheckCircleOutlineIcon />
                  </div>

                  <div>
                    <span>Recommended</span>
                    <strong>{recommendedCount}</strong>
                  </div>
                </div>
              </section>

              <section className="reviewsSearchCard">
                <div className="reviewsSearchHeader">
                  <div>
                    <h2>Find Product Reviews</h2>
                    <p>Enter the 24-character product ID to load reviews.</p>
                  </div>
                </div>

                <form
                  className="reviewsSearchForm"
                  onSubmit={productReviewsSubmitHandler}
                >
                  <div className="reviewsInputBox">
                    <label htmlFor="product-review-id">Product ID</label>

                    <div className="reviewsInputWrap">
                      <input
                        id="product-review-id"
                        type="text"
                        placeholder="Paste product ID here"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        maxLength={24}
                      />

                      <SearchOutlinedIcon />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="reviewsSearchButton"
                    disabled={loading || productId.trim() === ""}
                  >
                    Search Reviews
                  </button>
                </form>
              </section>

              <section className="reviewsTableCard">
                <div className="reviewsTableHeader">
                  <div>
                    <h2>All Reviews</h2>
                    <p>
                      {rows.length > 0
                        ? `${rows.length} reviews found`
                        : "No reviews loaded yet"}
                    </p>
                  </div>
                </div>

                {rows.length > 0 ? (
                  <div className="reviewsTableWrap">
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      getRowId={(row) => row.id}
                      autoHeight
                      disableRowSelectionOnClick
                      className="reviewsDataGrid"
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 10,
                          },
                        },
                      }}
                      pageSizeOptions={[10, 20, 50]}
                    />
                  </div>
                ) : (
                  <div className="reviewsEmptyState">
                    <StarRateIcon />
                    <h3>No Reviews Found</h3>
                    <p>
                      Search using a valid product ID to display customer
                      reviews here.
                    </p>
                  </div>
                )}
              </section>
            </section>
          </main>
        </>
      )}
    </>
  );
}

export default ProductReviews;