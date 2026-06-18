import React, { useEffect, useMemo, useState } from "react";
import "./OrderList.css";

import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import {
  getAllOrders,
  clearErrors,
  deleteOrder,
} from "../../actions/orderAction";

import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import Sidebar from "./Siderbar";
import Navbar from "./Navbar";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { DELETE_ORDER_RESET } from "../../constants/orderConstant";

function OrderList() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { error, loading, orders = [] } = useSelector(
    (state) => state.allOrders
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteUpdateOrder
  );

  const toggleHandler = () => {
    setToggle((prev) => !prev);
  };

  const deleteOrderHandler = (id) => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (confirmDelete) {
      dispatch(deleteOrder(id));
    }
  };

  const rows = useMemo(() => {
    return orders.map((item) => ({
      id: item._id,
      itemsQty: item.orderItems ? item.orderItems.length : 0,
      amount: Number(item.totalPrice || 0),
      status: item.orderStatus || "Processing",
      createdAt: item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("en-PK", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "N/A",
    }));
  }, [orders]);

  const filteredRows = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    if (!keyword) return rows;

    return rows.filter((item) => {
      return (
        item.id.toLowerCase().includes(keyword) ||
        item.status.toLowerCase().includes(keyword) ||
        item.createdAt.toLowerCase().includes(keyword)
      );
    });
  }, [rows, searchTerm]);

  const totalOrders = rows.length;

  const deliveredOrders = rows.filter(
    (order) => order.status === "Delivered"
  ).length;

  const pendingOrders = rows.filter(
    (order) => order.status !== "Delivered"
  ).length;

  const totalRevenue = rows.reduce((total, order) => {
    return total + Number(order.amount || 0);
  }, 0);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 230,
      flex: 0.9,
      headerClassName: "orderColumnHeader",
      renderCell: (params) => {
        return <span className="orderIdCell">{params.row.id}</span>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.55,
      headerClassName: "orderColumnHeader",
      renderCell: (params) => {
        const status = params.row.status;

        return (
          <span
            className={
              status === "Delivered"
                ? "orderStatusBadge deliveredStatus"
                : "orderStatusBadge pendingStatus"
            }
          >
            {status}
          </span>
        );
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 120,
      flex: 0.45,
      headerClassName: "orderColumnHeader",
      renderCell: (params) => {
        return <span className="orderQtyCell">{params.row.itemsQty}</span>;
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 160,
      flex: 0.55,
      headerClassName: "orderColumnHeader",
      renderCell: (params) => {
        const amount = Number(params.row.amount || 0);

        return (
          <span className="orderAmountCell">
            Rs. {amount.toLocaleString("en-PK")}
          </span>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Date",
      minWidth: 140,
      flex: 0.5,
      headerClassName: "orderColumnHeader",
      renderCell: (params) => {
        return <span className="orderDateCell">{params.row.createdAt}</span>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.45,
      sortable: false,
      filterable: false,
      headerClassName: "orderColumnHeader orderActionHeader",
      renderCell: (params) => {
        const orderId = params.row.id || params.id;

        return (
          <div className="orderActionButtons">
            <Link
              to={`/admin/order/${orderId}`}
              className="orderEditButton"
              aria-label="Edit order"
              title="Edit Order"
            >
              <EditIcon />
            </Link>

            <button
              type="button"
              className="orderDeleteButton"
              onClick={() => deleteOrderHandler(orderId)}
              aria-label="Delete order"
              title="Delete Order"
            >
              <DeleteIcon />
            </button>
          </div>
        );
      },
    },
  ];

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
      alert.success("Order Deleted Successfully");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, alert, isDeleted, deleteError]);

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
          <MetaData title="ALL Orders - Admin" />

          <main className="orderListPage">
            <aside
              className={
                toggle ? "orderListSidebar orderListSidebarOpen" : "orderListSidebar"
              }
            >
              <Sidebar />
            </aside>

            <section className="orderListMain">
              <div className="orderListNavbar">
                <Navbar toggleHandler={toggleHandler} />
              </div>

              <section className="orderListHero">
                <div className="orderListHeroContent">
                  <p className="orderListBadge">Cricket Wear Admin</p>

                  <h1>Order Management</h1>

                  <p>
                    Track customer orders, check delivery status, review order
                    totals, and manage store transactions.
                  </p>
                </div>

                <div className="orderListHeroIcon">
                  <ReceiptLongOutlinedIcon />
                </div>
              </section>

              <section className="orderListStats">
                <div className="orderStatCard">
                  <div className="orderStatIcon">
                    <ReceiptLongOutlinedIcon />
                  </div>

                  <div>
                    <span>Total Orders</span>
                    <strong>{totalOrders}</strong>
                  </div>
                </div>

                <div className="orderStatCard">
                  <div className="orderStatIcon">
                    <LocalShippingOutlinedIcon />
                  </div>

                  <div>
                    <span>Delivered</span>
                    <strong>{deliveredOrders}</strong>
                  </div>
                </div>

                <div className="orderStatCard dangerStat">
                  <div className="orderStatIcon">
                    <PendingActionsOutlinedIcon />
                  </div>

                  <div>
                    <span>Pending</span>
                    <strong>{pendingOrders}</strong>
                  </div>
                </div>

                <div className="orderStatCard revenueStat">
                  <div className="orderStatIcon">
                    <PaidOutlinedIcon />
                  </div>

                  <div>
                    <span>Total Revenue</span>
                    <strong>Rs. {totalRevenue.toLocaleString("en-PK")}</strong>
                  </div>
                </div>
              </section>

              <section className="orderListContainer">
                <div className="orderListHeader">
                  <div>
                    <h4 id="orderListHeading">All Orders</h4>
                    <p>{filteredRows.length} orders showing</p>
                  </div>
                </div>

                <div className="orderListToolbar">
                  <div className="orderSearchBox">
                    <SearchOutlinedIcon />

                    <input
                      type="text"
                      placeholder="Search by order ID, status, or date..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="orderListTableWrap">
                  <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    getRowId={(row) => row.id}
                    autoHeight
                    disableRowSelectionOnClick
                    className="orderListTable"
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

export default OrderList;