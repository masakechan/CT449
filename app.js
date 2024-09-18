const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error"); // Thêm phần import ApiError
const contactsRouter = require("./app/routes/contact.route"); // Thêm phần import contactsRouter

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Đăng ký các routes
app.use("/api/contacts", contactsRouter);

// Route mặc định
app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

// Xử lý response 404
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

// Xử lý lỗi tập trung
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error", // Sửa lỗi biến `error` thành `err`
    });
});

module.exports = app;
