const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookingsByUser,
  deleteBooking,
} = require("../controllers/booking-controller");
const auth = require("../middleware/protect-route");
router.post("/book", auth, createBooking);
router.get("/getBookingsByUser/:userId", auth, getBookingsByUser);
router.delete("/deleteBooking/:id", auth, deleteBooking);
