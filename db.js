const mongoose = require("mongoose");

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)

const trackService = require('./models');

module.exports = trackService;
