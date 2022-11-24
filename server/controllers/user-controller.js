const UserModel = require("../models/user-model");

class UserController {
  async auth(req, res) {
    const { name } = req.body;

    try {
      let user = await UserModel.findOne({
        name,
      });

      if (!user) {
        user = await UserModel.create({ name });
      }

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  async getUsers(req, res) {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = new UserController();
