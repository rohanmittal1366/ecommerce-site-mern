const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },

    lastName: {
      type: String,
      required: false,
      maxlength: 32,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      maxlength: 20,
      unique: true,
      trim: true,
    },

    userInfo: {
      type: String,
      trim: true,
    },

    encry_Password: {
      type: String,
    },

    salt: String,

    role: {
      type: Number,
      default: 0,
    },

    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("Password")
  .set(function (Password) {
    this._Password = Password;
    this.salt = uuidv4();
    this.encry_Password = this.securePassword(password);
  })
  .get(function () {
    return this._Password;
  });

userSchema.methods = {
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_Password;
  },
};

module.exports = mongoose.model("User", userSchema);
