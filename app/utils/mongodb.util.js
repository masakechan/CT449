const { MongoClient } = require("mongodb");

class MongoDB {
  static client = null; // Khai báo client ở đây để tránh lỗi

  // Phương thức kết nối đến cơ sở dữ liệu
  static connect = async (uri) => {
    if (this.client) return this.client; // Trả về client hiện tại nếu đã được khởi tạo

    try {
      this.client = await MongoClient.connect(uri, {
        useNewUrlParser: true, // Sử dụng URL parser mới
        useUnifiedTopology: true, // Sử dụng topology mới
      });
      console.log("Connected to MongoDB!");
      return this.client; // Trả về client đã kết nối
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      throw error; // Ném lại lỗi để xử lý ở nơi gọi
    }
  };

  // Phương thức để đóng kết nối
  static close = async () => {
    if (this.client) {
      await this.client.close(); // Đóng kết nối
      this.client = null; // Đặt lại client về null
      console.log("Connection to MongoDB closed.");
    }
  };
}

module.exports = MongoDB;

