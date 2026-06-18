import React, { useState, useEffect, useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import {
  BarChart,
  ShoppingCart,
  AssignmentInd,
  People,
  Inventory2Outlined,
  PaidOutlined,
} from "@mui/icons-material";

import { getAdminProducts, clearErrors } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import ProductImg from "../../Image/admin/products.png";
import ordersImg from "../../Image/admin/order.png";
import usersImg from "../../Image/admin/user.png";
import { dispalyMoney } from "../DisplayMoney/DisplayMoney";

const useStyles = makeStyles((theme) => ({
  dashboard: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: "1rem",
    margin: 0,
    padding: "0 1rem 2rem",
    background:
      "linear-gradient(180deg, #ffffff 0%, #fff7f7 45%, #ffffff 100%)",
    boxSizing: "border-box",
    overflowX: "hidden",

    [theme.breakpoints.down(999)]: {
      padding: "0 0.75rem 2rem",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "0 0.55rem 1.5rem",
    },
  },

  firstBox: {
    width: "20%",
    minWidth: "230px",
    maxWidth: "280px",
    height: "fit-content",
    margin: "0",
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    border: "1px solid rgba(227, 6, 5, 0.12)",
    boxShadow: "0 14px 34px rgba(227, 6, 5, 0.08)",
    overflow: "hidden",
    position: "sticky",
    top: "1rem",

    [theme.breakpoints.down(999)]: {
      display: "none",
    },
  },

  toggleBox: {
    width: "16rem",
    height: "fit-content",
    margin: "0",
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    border: "1px solid rgba(227, 6, 5, 0.14)",
    boxShadow: "0 18px 42px rgba(0, 0, 0, 0.22)",
    display: "block",
    zIndex: 1000,
    position: "absolute",
    top: "58px",
    left: "17px",
    overflow: "hidden",
  },

  secondBox: {
    width: "75%",
    minWidth: 0,
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",

    [theme.breakpoints.down(999)]: {
      width: "100%",
    },
  },

  navBar: {
    width: "100%",
    margin: 0,
  },

  dashboardHero: {
    width: "100%",
    padding: "1.3rem 1.4rem",
    borderRadius: "22px",
    background:
      "linear-gradient(135deg, rgba(18,18,18,0.96), rgba(227,6,5,0.86))",
    color: "#ffffff",
    boxShadow: "0 16px 38px rgba(227, 6, 5, 0.18)",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    overflow: "hidden",
    position: "relative",

    "&::after": {
      content: '""',
      position: "absolute",
      width: "220px",
      height: "220px",
      borderRadius: "50%",
      right: "-80px",
      top: "-90px",
      background: "rgba(255,255,255,0.08)",
    },

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "1.1rem",
      borderRadius: "18px",
    },
  },

  heroText: {
    position: "relative",
    zIndex: 1,
  },

  heroBadge: {
    width: "fit-content",
    margin: "0 0 0.7rem !important",
    padding: "0.38rem 0.85rem",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.12)",
    color: "#ffffff",
    fontFamily: "Roboto !important",
    fontSize: "0.72rem !important",
    fontWeight: "900 !important",
    letterSpacing: "0.8px !important",
    textTransform: "uppercase",
  },

  heroTitle: {
    margin: "0 !important",
    color: "#ffffff !important",
    fontFamily: "Archivo !important",
    fontSize: "clamp(1.65rem, 4vw, 2.7rem) !important",
    fontWeight: "900 !important",
    lineHeight: "1.1 !important",
    letterSpacing: "-0.7px !important",
  },

  heroSubtitle: {
    maxWidth: "620px",
    margin: "0.7rem 0 0 !important",
    color: "rgba(255,255,255,0.85) !important",
    fontFamily: "Roboto !important",
    fontSize: "0.95rem !important",
    lineHeight: "1.65 !important",
    fontWeight: "500 !important",
  },

  heroIconBox: {
    position: "relative",
    zIndex: 1,
    width: "74px",
    height: "74px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,

    "& svg": {
      fontSize: "2.4rem",
      color: "#ffffff",
    },

    [theme.breakpoints.down("sm")]: {
      width: "58px",
      height: "58px",
      borderRadius: "18px",

      "& svg": {
        fontSize: "2rem",
      },
    },
  },

  summaryCard: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "1rem",

    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },

    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
    },
  },

  cardContainer: {
    minHeight: "155px",
    padding: "1.2rem",
    borderRadius: "20px",
    boxShadow: "0 14px 34px rgba(227, 6, 5, 0.09)",
    transition:
      "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative",
    isolation: "isolate",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    border: "1px solid rgba(227, 6, 5, 0.12)",
    backgroundColor: "#121212",

    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(135deg, rgba(18,18,18,0.88), rgba(227,6,5,0.68))",
      zIndex: -1,
    },

    "&::after": {
      content: '""',
      position: "absolute",
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      right: "-44px",
      bottom: "-50px",
      background: "rgba(255,255,255,0.1)",
      zIndex: -1,
    },

    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 18px 42px rgba(227, 6, 5, 0.2)",
      borderColor: "rgba(227, 6, 5, 0.26)",
    },

    [theme.breakpoints.down("sm")]: {
      minHeight: "135px",
      borderRadius: "18px",
    },
  },

  cardTop: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "1rem",
  },

  cardIconBox: {
    width: "54px",
    height: "54px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    flexShrink: 0,

    "& svg": {
      fontSize: "2rem",
    },
  },

  cardLabel: {
    margin: "0 !important",
    color: "rgba(255,255,255,0.82) !important",
    fontFamily: "Roboto !important",
    fontSize: "0.85rem !important",
    fontWeight: "800 !important",
    textTransform: "uppercase",
    letterSpacing: "0.6px !important",
    textAlign: "right",
  },

  cardNumber: {
    margin: "1rem 0 0 !important",
    color: "#ffffff !important",
    fontFamily: "Archivo !important",
    fontSize: "2.05rem !important",
    fontWeight: "900 !important",
    lineHeight: "1 !important",
    textAlign: "right",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.75rem !important",
    },
  },

  cardFooter: {
    margin: "0.75rem 0 0 !important",
    color: "rgba(255,255,255,0.78) !important",
    fontFamily: "Roboto !important",
    fontSize: "0.82rem !important",
    fontWeight: "600 !important",
    textAlign: "right",
  },

  analyticsGrid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.08fr) minmax(310px, 0.92fr)",
    gap: "1rem",

    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
    },
  },

  chartCard: {
    width: "100%",
    minWidth: 0,
    minHeight: "390px",
    padding: "1.1rem",
    borderRadius: "20px",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(227, 6, 5, 0.12)",
    boxShadow: "0 14px 34px rgba(227, 6, 5, 0.08)",
    boxSizing: "border-box",
    overflow: "hidden",

    "& .highcharts-container": {
      width: "100% !important",
    },

    "& .highcharts-root": {
      maxWidth: "100%",
    },

    [theme.breakpoints.down("sm")]: {
      minHeight: "330px",
      padding: "0.8rem",
      borderRadius: "18px",
    },
  },

  revenueCard: {
    width: "100%",
    minHeight: "390px",
    padding: "1.4rem",
    borderRadius: "20px",
    backgroundColor: "#121212",
    border: "1px solid rgba(227, 6, 5, 0.18)",
    boxShadow: "0 14px 34px rgba(227, 6, 5, 0.12)",
    boxSizing: "border-box",
    overflow: "hidden",
    position: "relative",
    isolation: "isolate",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#ffffff",

    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(135deg, rgba(18,18,18,0.9), rgba(227,6,5,0.64))",
      zIndex: -1,
    },

    "&::after": {
      content: '""',
      position: "absolute",
      width: "220px",
      height: "220px",
      borderRadius: "50%",
      right: "-90px",
      bottom: "-90px",
      background: "rgba(255,255,255,0.08)",
      zIndex: -1,
    },

    [theme.breakpoints.down("sm")]: {
      minHeight: "260px",
      padding: "1rem",
      borderRadius: "18px",
    },
  },

  revenueIconBox: {
    width: "72px",
    height: "72px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",

    "& svg": {
      color: "#ffffff",
      fontSize: "2.4rem",
    },

    [theme.breakpoints.down("sm")]: {
      width: "58px",
      height: "58px",

      "& svg": {
        fontSize: "2rem",
      },
    },
  },

  revenueTitle: {
    margin: "0 !important",
    color: "#ffffff !important",
    fontFamily: "Archivo !important",
    fontSize: "1.25rem !important",
    fontWeight: "900 !important",
    textTransform: "uppercase",
    letterSpacing: "0.6px !important",
  },

  revenueAmount: {
    margin: "0.75rem 0 0 !important",
    color: "#ffffff !important",
    fontFamily: "Archivo !important",
    fontSize: "clamp(1.75rem, 4vw, 2.6rem) !important",
    fontWeight: "900 !important",
    lineHeight: "1 !important",
  },

  revenueSubText: {
    margin: "0.75rem 0 0 !important",
    color: "rgba(255,255,255,0.78) !important",
    fontFamily: "Roboto !important",
    fontSize: "0.9rem !important",
    lineHeight: "1.6 !important",
  },

  lineChart: {
    width: "100%",
    minHeight: "370px",
    padding: "1.1rem",
    borderRadius: "20px",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(227, 6, 5, 0.12)",
    boxShadow: "0 14px 34px rgba(227, 6, 5, 0.08)",
    boxSizing: "border-box",
    overflow: "hidden",

    "& .highcharts-container": {
      width: "100% !important",
    },

    "& .highcharts-root": {
      maxWidth: "100%",
    },

    [theme.breakpoints.down("sm")]: {
      minHeight: "320px",
      padding: "0.8rem",
      borderRadius: "18px",
    },
  },
}));

function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [toggle, setToggle] = useState(false);

  const { products = [], loading, error } = useSelector(
    (state) => state.products
  );

  const { orders = [], error: ordersError } = useSelector(
    (state) => state.allOrders
  );

  const { users = [], error: usersError } = useSelector(
    (state) => state.allUsers
  );

  const outOfStock = useMemo(() => {
    return products.reduce((total, product) => {
      const stock = Number(product.Stock ?? product.stock ?? 0);
      return stock === 0 ? total + 1 : total;
    }, 0);
  }, [products]);

  const inStock = Math.max(products.length - outOfStock, 0);

  const totalAmount = useMemo(() => {
    return orders.reduce((total, item) => {
      return total + Number(item.totalPrice || 0);
    }, 0);
  }, [orders]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (usersError) {
      alert.error(usersError);
      dispatch(clearErrors());
    }

    if (ordersError) {
      alert.error(ordersError);
      dispatch(clearErrors());
    }

    dispatch(getAllOrders());
    dispatch(getAllUsers());
    dispatch(getAdminProducts());
  }, [dispatch, error, alert, ordersError, usersError]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) {
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [toggle]);

  const toggleHandler = () => {
    setToggle((prev) => !prev);
  };

  const lineOptions = {
    chart: {
      type: "areaspline",
      backgroundColor: "#ffffff",
      spacing: [18, 18, 18, 18],
      height: 330,
      style: {
        fontFamily: "Roboto",
      },
    },
    title: {
      text: "Revenue Overview",
      style: {
        color: "#121212",
        fontWeight: "900",
        fontFamily: "Archivo",
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: ["Start", "Revenue"],
      lineColor: "rgba(227, 6, 5, 0.18)",
      tickColor: "rgba(227, 6, 5, 0.18)",
      labels: {
        style: {
          color: "#121212",
          fontWeight: "800",
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      gridLineColor: "rgba(227, 6, 5, 0.09)",
      labels: {
        style: {
          color: "#555555",
          fontWeight: "700",
        },
      },
    },
    tooltip: {
      backgroundColor: "#121212",
      borderColor: "#121212",
      style: {
        color: "#ffffff",
      },
      formatter: function () {
        return `<b>${this.x}</b><br/>Amount: <b>${dispalyMoney(this.y)}</b>`;
      },
    },
    series: [
      {
        name: "Total Revenue",
        data: [0, totalAmount],
        color: "#e30605",
        fillColor: {
          linearGradient: [0, 0, 0, 280],
          stops: [
            [0, "rgba(227, 6, 5, 0.28)"],
            [1, "rgba(227, 6, 5, 0.02)"],
          ],
        },
        lineWidth: 4,
        marker: {
          enabled: true,
          radius: 5,
          fillColor: "#e30605",
          lineColor: "#ffffff",
          lineWidth: 2,
        },
      },
    ],
  };

  const doughnutOptions = {
    chart: {
      type: "pie",
      backgroundColor: "#ffffff",
      spacing: [18, 18, 18, 18],
      height: 330,
      style: {
        fontFamily: "Roboto",
      },
    },
    title: {
      text: "Product Stock Status",
      align: "center",
      style: {
        color: "#121212",
        fontWeight: "900",
        fontFamily: "Archivo",
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      backgroundColor: "#121212",
      borderColor: "#121212",
      style: {
        color: "#ffffff",
      },
      pointFormat: "<b>{point.y}</b> products",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        innerSize: "58%",
        borderWidth: 3,
        borderColor: "#ffffff",
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.y}",
          style: {
            color: "#121212",
            fontWeight: "800",
            textOutline: "none",
          },
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Products",
        data: [
          {
            name: "In Stock",
            y: inStock,
            color: "#121212",
          },
          {
            name: "Out of Stock",
            y: outOfStock,
            color: "#e30605",
            sliced: true,
            selected: true,
          },
        ],
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 520,
          },
          chartOptions: {
            chart: {
              height: 285,
            },
            plotOptions: {
              pie: {
                dataLabels: {
                  enabled: false,
                },
              },
            },
          },
        },
      ],
    },
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Dashboard - Admin Panel" />

          <div className={classes.dashboard}>
            <div className={!toggle ? classes.firstBox : classes.toggleBox}>
              <Sidebar />
            </div>

            <div className={classes.secondBox}>
              <div className={classes.navBar}>
                <Navbar toggleHandler={toggleHandler} />
              </div>

              <section className={classes.dashboardHero}>
                <div className={classes.heroText}>
                  <Typography component="p" className={classes.heroBadge}>
                    Cricket Wear Admin
                  </Typography>

                  <Typography component="h1" className={classes.heroTitle}>
                    Dashboard Overview
                  </Typography>

                  <Typography component="p" className={classes.heroSubtitle}>
                    Manage products, track orders, monitor users, and review
                    store performance from one clean admin panel.
                  </Typography>
                </div>

                <div className={classes.heroIconBox}>
                  <Inventory2Outlined />
                </div>
              </section>

              <section className={classes.summaryCard}>
                <div
                  className={classes.cardContainer}
                  style={{
                    backgroundImage: `url(${ProductImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => history.push("/admin/products")}
                >
                  <div className={classes.cardTop}>
                    <div className={classes.cardIconBox}>
                      <ShoppingCart />
                    </div>

                    <div>
                      <Typography component="p" className={classes.cardLabel}>
                        Total Products
                      </Typography>

                      <Typography component="h2" className={classes.cardNumber}>
                        {products.length}
                      </Typography>

                      <Typography component="p" className={classes.cardFooter}>
                        Product inventory
                      </Typography>
                    </div>
                  </div>
                </div>

                <div
                  className={classes.cardContainer}
                  style={{
                    backgroundImage: `url(${ordersImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => history.push("/admin/orders")}
                >
                  <div className={classes.cardTop}>
                    <div className={classes.cardIconBox}>
                      <AssignmentInd />
                    </div>

                    <div>
                      <Typography component="p" className={classes.cardLabel}>
                        Total Orders
                      </Typography>

                      <Typography component="h2" className={classes.cardNumber}>
                        {orders.length}
                      </Typography>

                      <Typography component="p" className={classes.cardFooter}>
                        Customer orders
                      </Typography>
                    </div>
                  </div>
                </div>

                <div
                  className={classes.cardContainer}
                  style={{
                    backgroundImage: `url(${usersImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => history.push("/admin/users")}
                >
                  <div className={classes.cardTop}>
                    <div className={classes.cardIconBox}>
                      <People />
                    </div>

                    <div>
                      <Typography component="p" className={classes.cardLabel}>
                        Total Users
                      </Typography>

                      <Typography component="h2" className={classes.cardNumber}>
                        {users.length}
                      </Typography>

                      <Typography component="p" className={classes.cardFooter}>
                        Registered users
                      </Typography>
                    </div>
                  </div>
                </div>
              </section>

              <section className={classes.analyticsGrid}>
                <div className={classes.chartCard}>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={doughnutOptions}
                  />
                </div>

                <div
                  className={classes.revenueCard}
                  style={{
                    backgroundImage: `url(${ProductImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className={classes.revenueIconBox}>
                    <PaidOutlined />
                  </div>

                  <Typography component="h2" className={classes.revenueTitle}>
                    Total Revenue
                  </Typography>

                  <Typography component="p" className={classes.revenueAmount}>
                    {dispalyMoney(totalAmount)}
                  </Typography>

                  <Typography component="p" className={classes.revenueSubText}>
                    Revenue calculated from completed order totals.
                  </Typography>
                </div>
              </section>

              <section className={classes.lineChart}>
                <HighchartsReact highcharts={Highcharts} options={lineOptions} />
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;