const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// routes /api/tickets/ .....get user tickets
// private access
const getTickets = asyncHandler(async (req, res) => {
  // get user id from jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.find({ user: req.user.id });

  res.status(200).json(ticket);
});

// routes /api/tickets/:id .....get user tickets
// private access
const getTicket = asyncHandler(async (req, res) => {
  // get user id from jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(ticket);
});

// routes /api/tickets/ .....new ticket tickets
// private access
// post
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product and description");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(ticket);
});

// routes /api/tickets/:id .....delete ticket
// private access
const deleteTicket = asyncHandler(async (req, res) => {
  // get user id from jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findByIdAndRemove(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  console.log(ticket);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json({ succes: true });
});

// routes /api/tickets/:id .....update   user tickets
// private access
const updateTicket = asyncHandler(async (req, res) => {
  // get user id from jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
};
