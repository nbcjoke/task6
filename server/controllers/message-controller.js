const MessageModel = require("../models/message-model");

class MessageController {
  async addMessage(req, res, io) {
    try {
      const { from, to, message } = req.body;
      const time = new Date().toLocaleString();
      const result = await MessageModel.create({
        from,
        to,
        message,
        time,
      });
      const messageObject = await result.populate("from to");

      const sockets = await io.fetchSockets();
      const filtered = sockets.filter((socket) => socket.client.id === to);
      const currentSocket = filtered[filtered.length - 1];
      if (currentSocket) {
        currentSocket.emit("message", messageObject);
      }
      res.status(200).json(messageObject);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  async getMessages(req, res) {
    try {
      const result = await MessageModel.find().populate("from to");
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = new MessageController();
