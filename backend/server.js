const express = require("express");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectToMongoDB = require("./db/connectToMongoDB");
const authRoutes = require("./routes/auth-routes");
const eventRoutes = require("./routes/event-routes");
const bookingRoutes = require("./routes/booking-routes");

dotenv.config();

const app = express();
const allowdOrigins = [
  "http://localhost:5173",
  "https://tazkarti-mourad.vercel.app",
];
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

const PORT = 5000;
const server = http.createServer(app);
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
