
const MessageModel = require("../model/messageModel.js")
const moment = require('moment');


exports.addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  let timestamp = moment().toISOString();
  const message = new MessageModel({
    chatId,
    senderId,
    text,
    createdAt: timestamp
    
  });
  try {
    const msg = await message.save();
    res.status(200).json(msg);
  } catch (error) {
    res.status(500).json(error.message);
  }
};



exports.getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const msg = await MessageModel.find({ chatId });
    res.status(200).json(msg);
  } catch (error) {
    res.status(500).json(error);
  }
};



exports.deleteMessages = async (req, res) => {
  try {

    let id = req.params.id;

    let findMessage = await MessageModel.findById(id);

    findMessage.isDeleted = true

    await findMessage.save()

    return res.status(200).send({ message: "Message Deleted" })

  }
  catch (err) {
    return res.status(500).send({ error: err.message })
  }

}
