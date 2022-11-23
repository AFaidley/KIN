const { Schema, model } = require("mongoose");
const User = require('./User')

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  eventText: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  }
});

const Event = model('event', eventSchema);
module.exports = Event;
