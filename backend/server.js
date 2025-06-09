const express = require("express");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectToMongoDB = require("./db/connectToMongoDB");
const authRoutes = require("./routes/auth-routes");
const eventRoutes = require("./routes/event-routes");
const bookingRoutes = require("./routes/booking-routes");
const logger = require("./utils/logger");
const multer = require("multer");
const path = require("path");

dotenv.config();

const app = express();
const allowdOrigins = [
  "http://localhost:5173",
  "https://tazkarti-mourad.vercel.app",
];

// setup multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(
        "Error: File upload only supports the following filetypes - " +
          filetypes
      );
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: allowdOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/events", upload.single("image"), eventRoutes);

const PORT = 5000;
const server = http.createServer(app);
server.listen(PORT, () => {
  connectToMongoDB();
  logger.log(`Server is running on port ${PORT}`);
});
