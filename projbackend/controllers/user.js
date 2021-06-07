const User = require("../models/user");
const uuidv4 = require("uuid/v4");
const crypto = require("crypto");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      // console.log(err);
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
  //console.log("1st ", req.profile.name);
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
      //console.log("2nd", user.name);
      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.json(user);
    }
  );
};

const securedPassword = (user) => {
  user.salt = uuidv4();
  user.encry_password = crypto
    .createHmac("sha256", user.salt)
    .update(user.password)
    .digest("hex");
  return user;
};

exports.updateUser = (req, res) => {
  //console.log("1st ", req.profile.name);
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: securedPassword(req.body) },
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

      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({
    user: req.profile._id,
  })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order in this account",
        });
      }

      return res.json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      discription: product.discription,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_Id: req.body.order.transaction_Id,
    });
  });

  // store this in DB

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      next();
    }
  );
};
