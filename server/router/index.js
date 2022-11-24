const Router = require("express").Router;
const router = new Router();

const messageController = require("../controllers/message-controller");
const userController = require("../controllers/user-controller");

function routes(io) {
  router.post("/message", (req, res) =>
    messageController.addMessage(req, res, io)
  );
  router.post("/auth", userController.auth);
  router.get("/messages", messageController.getMessages);
  router.get("/users", userController.getUsers);

  return router;
}

module.exports = routes;
