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
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Event = model('event', eventSchema);
module.exports = Event;
