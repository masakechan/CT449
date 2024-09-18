const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route mặc định
app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

// Import contactsRouter và đăng ký routes
const contactsRouter = require("./app/routes/contact.route");

app.use("/api/contacts", contactsRouter);

module.exports = app;
