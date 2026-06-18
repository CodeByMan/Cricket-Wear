import React, { useEffect, useMemo, useState, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CricketBallLoader from "./component/layouts/loader/Loader";
import PrivateRoute from "./component/Route/PrivateRoute";
import "./App.css";

import Header from "./component/layouts/Header1.jsx/Header";
import Payment from "./component/Cart/Payment";
import Home from "./component/Home/Home";
import Services from "./Terms&Condtions/Service";
import Footer from "./component/layouts/Footer/Footer";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Signup from "./component/User/SignUp";
import Login from "./component/User/Login";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgetPassword from "./component/User/ForgetPassword";
import ResetPassword from "./component/User/ResetPassword";
import Shipping from "./component/Cart/Shipping";
import Cart from "./component/Cart/Cart";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrder from "./component/order/MyOrder";
import ContactForm from "./Terms&Condtions/Contact";
import AboutUsPage from "./Terms&Condtions/Aboutus";
import ReturnPolicyPage from "./Terms&Condtions/Return";
import TermsUse from "./Terms&Condtions/TermsAndUse";
import TermsAndConditions from "./Terms&Condtions/TermsCondtion";
import PrivacyPolicy from "./Terms&Condtions/Privacy";

const LazyDashboard = React.lazy(() => import("./component/Admin/Dashboard"));
const LazyProductList = React.lazy(() => import("./component/Admin/ProductList"));
const LazyOrderList = React.lazy(() => import("./component/Admin/OrderList"));
const LazyUserList = React.lazy(() => import("./component/Admin/UserList"));
const LazyUpdateProduct = React.lazy(() => import("./component/Admin/UpdateProduct"));
const LazyProcessOrder = React.lazy(() => import("./component/Admin/ProcessOrder"));
const LazyUpdateUser = React.lazy(() => import("./component/Admin/UpdateUser"));
const LazyNewProduct = React.lazy(() => import("./component/Admin/NewProduct"));
const LazyProductReviews = React.lazy(() => import("./component/Admin/ProductReviews"));

const isValidStripePublishableKey = (key) => {
  if (typeof key !== "string") return false;
  const value = key.trim();
  if (!value.startsWith("pk_")) return false;
  if (value.includes("your-stripe") || value.includes("your_")) return false;
  return value.length > 20;
};

function Page({ children, withServices = true }) {
  return (
    <>
      <Header />
      {children}
      {withServices && <Services />}
      <Footer />
    </>
  );
}

function StripeUnavailable() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
      <div>
        <h2>Payment gateway is not configured yet.</h2>
        <p>Please add a valid Stripe publishable key and secret key to enable checkout.</p>
      </div>
    </div>
  );
}

function PaymentRoute() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [checkedStripe, setCheckedStripe] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function getStripeApiKey() {
      try {
        const { data } = await axios.get("/api/v1/stripeapikey");
        const key = data?.stripeApiKey || "";
        if (!isMounted) return;
        setStripeApiKey(isValidStripePublishableKey(key) ? key.trim() : "");
      } catch (error) {
        if (isMounted) setStripeApiKey("");
      } finally {
        if (isMounted) setCheckedStripe(true);
      }
    }

    getStripeApiKey();

    return () => {
      isMounted = false;
    };
  }, []);

  const stripePromise = useMemo(() => {
    if (!isValidStripePublishableKey(stripeApiKey)) return null;
    return loadStripe(stripeApiKey);
  }, [stripeApiKey]);

  if (!checkedStripe || !stripePromise) {
    return (
      <Page>
        <StripeUnavailable />
      </Page>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <Page>
        <PrivateRoute exact path="/process/payment" component={Payment} />
      </Page>
    </Elements>
  );
}

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Page><Home /></Page>} />
        <Route exact path="/product/:id" render={() => <Page><ProductDetails /></Page>} />
        <Route exact path="/products" render={() => <Page><Products /></Page>} />
        <Route path="/products/:keyword" render={() => <Page><Products /></Page>} />
        <Route exact path="/signup" render={() => <Page><Signup /></Page>} />
        <Route exact path="/login" render={() => <Page><Login /></Page>} />
        <Route exact path="/password/forgot" render={() => <Page><ForgetPassword /></Page>} />
        <Route exact path="/password/reset/:token" render={() => <Page><ResetPassword /></Page>} />
        <Route exact path="/cart" render={() => <Page><Cart /></Page>} />
        <Route exact path="/policy/return" render={() => <Page><ReturnPolicyPage /></Page>} />
        <Route exact path="/policy/Terms" render={() => <Page><TermsUse /></Page>} />
        <Route exact path="/policy/privacy" render={() => <Page><PrivacyPolicy /></Page>} />
        <Route exact path="/terms/conditions" render={() => <Page><TermsAndConditions /></Page>} />
        <Route exact path="/contact" render={() => <Page withServices={false}><ContactForm /></Page>} />
        <Route exact path="/about_us" render={() => <Page withServices={false}><AboutUsPage /></Page>} />
        <Route exact path="/account" render={() => <Page><PrivateRoute exact path="/account" component={Profile} /></Page>} />
        <Route exact path="/profile/update" render={() => <Page><PrivateRoute exact path="/profile/update" component={UpdateProfile} /></Page>} />
        <Route exact path="/password/update" render={() => <Page><PrivateRoute exact path="/password/update" component={UpdatePassword} /></Page>} />
        <Route exact path="/orders" render={() => <Page><PrivateRoute exact path="/orders" component={MyOrder} /></Page>} />
        <Route exact path="/shipping" render={() => <Page><PrivateRoute exact path="/shipping" component={Shipping} /></Page>} />
        <Route exact path="/order/confirm" render={() => <Page><PrivateRoute exact path="/order/confirm" component={ConfirmOrder} /></Page>} />
        <Route exact path="/success" render={() => <Page><PrivateRoute exact path="/success" component={OrderSuccess} /></Page>} />
      </Switch>

      <Suspense fallback={<CricketBallLoader />}>
        <Switch>
          <PrivateRoute isAdmin exact path="/admin/dashboard" component={LazyDashboard} />
          <PrivateRoute isAdmin exact path="/admin/products" component={LazyProductList} />
          <PrivateRoute isAdmin exact path="/admin/product/:id" component={LazyUpdateProduct} />
          <PrivateRoute isAdmin exact path="/admin/reviews" component={LazyProductReviews} />
          <PrivateRoute isAdmin exact path="/admin/orders" component={LazyOrderList} />
          <PrivateRoute isAdmin exact path="/admin/order/:id" component={LazyProcessOrder} />
          <PrivateRoute isAdmin exact path="/admin/new/product" component={LazyNewProduct} />
          <PrivateRoute isAdmin exact path="/admin/users" component={LazyUserList} />
          <PrivateRoute isAdmin exact path="/admin/user/:id" component={LazyUpdateUser} />
        </Switch>
      </Suspense>

      <Route exact path="/process/payment" component={PaymentRoute} />
    </Router>
  );
}

export default App;
