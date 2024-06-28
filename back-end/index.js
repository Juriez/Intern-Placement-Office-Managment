const express = require("express");
require("express-async-errors");

const mongoose = require("mongoose");
const cors = require("cors");
var cookieParser = require('cookie-parser')


const { authRouter } = require("./src/modules/auth/auth.controller");
const { userRouter } = require("./src/modules/users/user.controller");
const { studentRouter } = require("./src/modules/students/student.controller");
const { companyRouter } = require("./src/modules/companies/company.controller");
const { companyManager } = require("./src/modules/company-managers/company-manager.controller");

const app = express();
app.use(express.json());
app.use(cookieParser())

const allowedOrigins = ['http://localhost:5173'];

app.use(
    cors({
      origin: allowedOrigins,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
      credentials: true,
    })
  );

app.use(express.static('./public'));


mongoose
    .connect("mongodb://127.0.0.1:27017/ipoc")
    .then(() => {
        console.log("database connection established");
    })
    .catch((err) => {
        console.log("error connecting to database", err);
    });

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/companies", companyRouter);
app.use("/students", studentRouter);
app.use("/company-managers", companyManager);

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000...");
});
