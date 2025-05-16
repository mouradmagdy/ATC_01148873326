const Event = require("../models/event-model");
const createEvent = async (req, res) => {
  try {
    const { name, description, category, venue, price, image, date } = req.body;
    if (!name || !description || !category || !venue || !price || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const event = new Event({
      name,
      description,
      category,
      venue,
      price,
      image,
      date,
      createdBy: req.user._id,
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getAllEvents = async (req, res) => {
  try {
    const { category, pageNumber = 1, pageSize = 10 } = req.query;

    const query = {};
    if (category) query.category = category;
    const events = await Event.find(query)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .select("-__v");

    const totalEvents = await Event.countDocuments(query);
    res.status(200).json({
      events,
      totalEvents,
      page: Number(pageNumber),
      limit: Number(pageSize),
    });
  } catch (error) {
    console.log("Error in getAllEvents controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).select("-__v");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.log("Error in getEventById controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log("Error in deleteEvent controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, venue, price, image, date } = req.body;
    const event = await Event.findByIdAndUpdate(
      id,
      { name, description, category, venue, price, image, date },
      { new: true, runValidators: true }
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.log("Error in updateEvent controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  deleteEvent,
  updateEvent,
};
