const User = require("../model/user");
const ChatModel = require("../model/chatModel.js")

exports.createChat = async (req, res) => {
  try {
  let {senderId,receiverId} = req.body

  let checkUser =   await ChatModel.findOne({
    members: { $eq: [senderId,receiverId] },
  });

   

  if(checkUser){
    return res.status(400).json({message:"chat already created"})
  }

  const newChat = new ChatModel({
    members: [senderId,receiverId]
  });
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};



exports.findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
};



exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id) 
    if (!user) {
      return res.status(404).json({ success: false, message: "User does not Exists" })
    }

    //res.status(200).json({ success: true, user })
    res.status(200).json(user)

  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }

}