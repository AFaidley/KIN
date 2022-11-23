const { Schema, model } = require("mongoose");
const User = require('./user')

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  eventText: {
    type: String,
    required: true,
  },
  username: User
});

const Event = model('event', eventSchema);
module.exports = Event;
