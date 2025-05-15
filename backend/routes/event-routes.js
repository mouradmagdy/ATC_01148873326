const express = require("express");
const auth = require("../middleware/protect-route");
const checkEventAuthorization = require("../middleware/protect-event");
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/event-controller");
const router = express.Router();
router.post("/create", auth, checkEventAuthorization, createEvent);
router.get("/getAllEvents", auth, getAllEvents);
router.get("/getEventById/:id", auth, getEventById);
router.delete("/deleteEvent/:id", auth, checkEventAuthorization, deleteEvent);
router.put("/updateEvent/:id", auth, checkEventAuthorization, updateEvent);
module.exports = router;
