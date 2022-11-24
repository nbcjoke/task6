const { Schema, model, Types } = require("mongoose");

const MessageModel = new Schema({
  from: { type: Types.ObjectId, ref: "User" },
  to: { type: Types.ObjectId, ref: "User" },
  message: {
    text: { type: String, required: true },
    theme: { type: String, required: true },
  },
  time: { type: String, required: true },
});

module.exports = model("Message", MessageModel);
