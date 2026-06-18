const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const helmet = require("helmet");

const errorMiddleware = require("./middleWare/error");
const requestLogger = require("./middleWare/requestLogger");
const user = require("./route/userRoute");
const order = require("./route/orderRoute");
const product = require("./route/productRoute");
const payment = require("./route/paymentRoute");
const health = require("./route/healthRoute");

const app = express();

/*
  Important fix:
  This allows Express to correctly read query filters like:
  price[gte]=0
  price[lte]=100000
  ratings[gte]=0
*/
app.set("query parser", "extended");

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
  })
);

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);

if (process.env.LOG_REQUESTS === "true") {
  app.use(requestLogger);
}

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload({ useTempFiles: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", health);

const projectRoot = path.resolve(__dirname, "..");
const frontendDist = path.join(projectRoot, "frontend", "dist");

app.use(express.static(frontendDist));

app.get(/.*/, (req, res, next) => {
  if (req.originalUrl.startsWith("/api")) return next();

  res.sendFile(path.join(frontendDist, "index.html"), (err) => {
    if (err) next();
  });
});

app.use(errorMiddleware);

module.exports = app;