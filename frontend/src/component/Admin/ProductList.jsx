import React, { useState, useEffect, useMemo } from "react";
import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getAdminProducts,
  deleteProduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import Sidebar from "./Siderbar";
import Navbar from "./Navbar";
import { DELETE_PRODUCT_RESET } from "../../constants/productsConstatns";

function ProductList() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { error, products = [], loading } = useSelector(
    (state) => state.products
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteUpdateProduct
  );

  const deleteProductHandler = (id) => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      dispatch(deleteProduct(id));
    }
  };

  const rows = useMemo(() => {
    return products.map((item) => ({
      id: item._id,
      stock: item.Stock ?? item.stock ?? 0,
      price: item.price ?? 0,
      name: item.name || "Unnamed Product",
      category: item.category || "No Category",
    }));
  }, [products]);

  const filteredRows = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    if (!keyword) return rows;

    return rows.filter((item) => {
      return (
        item.name.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.id.toLowerCase().includes(keyword)
      );
    });
  }, [rows, searchTerm]);

  const totalProducts = rows.length;

  const outOfStockProducts = rows.filter(
    (product) => Number(product.stock) <= 0
  ).length;

  const inStockProducts = totalProducts - outOfStockProducts;

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 230,
      flex: 0.9,
      headerClassName: "productColumnHeader",
      renderCell: (params) => {
        return <span className="productIdCell">{params.row.id}</span>;
      },
    },
    {
      field: "name",
      headerName: "Product Name",
      minWidth: 220,
      flex: 1,
      headerClassName: "productColumnHeader",
      renderCell: (params) => {
        return (
          <div className="productNameCell">
            <span>{params.row.name}</span>
            <small>{params.row.category}</small>
          </div>
        );
      },
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 120,
      flex: 0.45,
      headerClassName: "productColumnHeader",
      renderCell: (params) => {
        const stock = Number(params.row.stock || 0);

        return (
          <span
            className={
              stock <= 0
                ? "productStockBadge productStockOut"
                : "productStockBadge"
            }
          >
            {stock <= 0 ? "Out" : stock}
          </span>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      flex: 0.55,
      headerClassName: "productColumnHeader",
      renderCell: (params) => {
        const price = Number(params.row.price || 0);

        return (
          <span className="productPriceCell">
            Rs. {price.toLocaleString("en-PK")}
          </span>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.55,
      sortable: false,
      filterable: false,
      minWidth: 150,
      headerClassName: "productColumnHeader productActionHeader",
      renderCell: (params) => {
        const productId = params.row.id || params.id;

        return (
          <div className="productActionButtons">
            <Link
              to={`/admin/product/${productId}`}
              className="productEditButton"
              aria-label="Edit product"
              title="Edit Product"
            >
              <EditIcon />
            </Link>

            <button
              type="button"
              className="productDeleteButton"
              onClick={() => deleteProductHandler(productId)}
              aria-label="Delete product"
              title="Delete Product"
            >
              <DeleteIcon />
            </button>
          </div>
        );
      },
    },
  ];

  const toggleHandler = () => {
    setToggle((prev) => !prev);
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
      alert.success("Product Deleted Successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProducts());
  }, [dispatch, error, alert, deleteError, isDeleted]);

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
          <MetaData title="ALL PRODUCTS - Admin" />

          <main className="productListPage">
            <aside
              className={
                toggle ? "productListSidebar productListSidebarOpen" : "productListSidebar"
              }
            >
              <Sidebar />
            </aside>

            <section className="productListMain">
              <div className="productListNavbar">
                <Navbar toggleHandler={toggleHandler} />
              </div>

              <section className="productListHero">
                <div className="productListHeroContent">
                  <p className="productListBadge">Cricket Wear Admin</p>

                  <h1>Product Inventory</h1>

                  <p>
                    Manage cricket products, update stock, edit pricing, and add
                    new store items.
                  </p>
                </div>

                <div className="productListHeroIcon">
                  <Inventory2OutlinedIcon />
                </div>
              </section>

              <section className="productListStats">
                <div className="productStatCard">
                  <div className="productStatIcon">
                    <StorefrontOutlinedIcon />
                  </div>

                  <div>
                    <span>Total Products</span>
                    <strong>{totalProducts}</strong>
                  </div>
                </div>

                <div className="productStatCard">
                  <div className="productStatIcon">
                    <Inventory2OutlinedIcon />
                  </div>

                  <div>
                    <span>In Stock</span>
                    <strong>{inStockProducts}</strong>
                  </div>
                </div>

                <div className="productStatCard dangerStat">
                  <div className="productStatIcon">
                    <ProductionQuantityLimitsOutlinedIcon />
                  </div>

                  <div>
                    <span>Out of Stock</span>
                    <strong>{outOfStockProducts}</strong>
                  </div>
                </div>
              </section>

              <section className="productListContainer">
                <div className="productListHeader">
                  <div>
                    <h4 id="productListHeading">All Products</h4>
                    <p>{filteredRows.length} products showing</p>
                  </div>

                  <Link to="/admin/new/product" className="addProductBtn">
                    <AddCircleOutlineIcon />
                    <span>Add Product</span>
                  </Link>
                </div>

                <div className="productListToolbar">
                  <div className="productSearchBox">
                    <SearchOutlinedIcon />
                    <input
                      type="text"
                      placeholder="Search by name, category, or product ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="productListTableWrap">
                  <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    getRowId={(row) => row.id}
                    disableRowSelectionOnClick
                    autoHeight
                    className="productListTable"
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
              </section>
            </section>
          </main>
        </>
      )}
    </>
  );
}

export default ProductList;