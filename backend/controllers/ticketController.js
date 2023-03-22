const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// routes /api/tickets/ .....get user tickets 
// private access 
const getTickets = asyncHandler(async (req, res) => {

  
  res.status(200).json({ message:'getTickets'})
  })


  // routes /api/tickets/ .....new ticket tickets 
// private access 
// post
const createTicket = asyncHandler(async (req, res) => {

  
    res.status(200).json({ message:'create ticket'})
    })


    module.exports = {
        getTickets,createTicket
    }