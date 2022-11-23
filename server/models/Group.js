const { Schema, model } = require("mongoose");

const groupSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const Group = model("Group", groupSchema);

module.exports = Group;
