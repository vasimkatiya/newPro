const conversationModel = require("../models/conversation.model");
const messageModel = require("../models/message.model");

exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Message required" });
    }

    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = await messageModel.create({
      senderId,
      receiverId,
      message,
    });

    conversation.messages.push(newMessage._id);
    await conversation.save();

    res.status(201).json({
      newMessage,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.params.id;

    const conversation = await conversationModel
      .findOne({
        participants: { $all: [senderId, receiverId] },
      })
      .populate("messages");

    res.status(200).json({
      messages: conversation ? conversation.messages : [],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};