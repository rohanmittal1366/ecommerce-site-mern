const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }

    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  // TODO : get back here for password
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  console.log("1st ", req.profile.name);
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    {
      new: true,
      useFindAndModify: false,
    },
    (err, user) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "You are not authorized to update this user",
        });
      }
      console.log("2nd", user.name);
      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.json(user);
    }
  );
};
