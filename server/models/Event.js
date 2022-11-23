const { Schema } = require("mongoose");

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  eventText: {
    type: String,
    required: true,
  },
});

module.exports = eventSchema;
