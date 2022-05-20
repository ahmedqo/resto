const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middlewares/error");
global.root = path.resolve(__dirname);

const app = express();

// config
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "config/config.env" });
}

app.use(
    cors({
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true,
    })
);
app.options(
    "*",
    cors({
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true,
    })
);
app.use(cookieParser());
app.use(fileUpload());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const user = require("./routes/userRoute");
const product = require("./routes/productRoute");
const order = require("./routes/orderRoute");
const cuisine = require("./routes/cuisineRoute");

app.use("/api/", user);
app.use("/api/", order);
app.use("/api/", product);
app.use("/api/", cuisine);

// deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "build", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("Server is Running! 🚀");
    });
}

// error middleware
app.use(errorMiddleware);

module.exports = app;