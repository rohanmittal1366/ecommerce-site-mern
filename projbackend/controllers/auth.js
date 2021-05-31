const User = require("../models/user");

exports.signout = (req, res) => {
  res.json({
    message: "User has signout",
  });
};

exports.signup = (req, res) => {};
