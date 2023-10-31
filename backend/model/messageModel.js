const mongoose = require ("mongoose");
const moment = require('moment');

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
    isDeleted:{
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Set a default value to the current timestamp
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", MessageSchema);
 
