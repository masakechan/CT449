const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

async function startServer() {
  try {
    // Kết nối đến cơ sở dữ liệu MongoDB
    await MongoDB.connect(config.db.uri);
    console.log("Connected to the database!");

    // Bắt đầu server
    const PORT = config.app.port;
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });

    // Xử lý tín hiệu tắt server
    process.on("SIGINT", async () => {
      await MongoDB.close(); // Đóng kết nối MongoDB
      server.close(() => {
        console.log("Server closed.");
        process.exit(0); // Thoát ứng dụng
      });
    });

    process.on("SIGTERM", async () => {
      await MongoDB.close(); // Đóng kết nối MongoDB
      server.close(() => {
        console.log("Server closed.");
        process.exit(0); // Thoát ứng dụng
      });
    });
  } catch (error) {
    console.error("Cannot connect to the database!", error.message); // Hiển thị thông báo lỗi
    process.exit(1); // Thoát ứng dụng với mã lỗi
  }
}

// Khởi động server
startServer();
