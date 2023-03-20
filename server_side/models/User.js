const mongoose = require("mongoose");
const config = require("config");
const connection = require("../database");
const { pbkdf2, randomBytes } = require("crypto");

const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: [true, "User must have a name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "E-mail field is required"],
      unique: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,12})?$/,
        "Please, enter a valid email",
      ],
    },
    passwordHash: {
      type: String,
    },
    salt: {
      type: String,
    },
    recipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "recipe",
      },
    ],
  },
  {
    timestamps: true,
  }
);

function generatePassword(salt, password) {
  return new Promise((resolve, reject) => {
    pbkdf2(
      password,
      salt,
      config.get("crypto.iterations"),
      config.get("crypto.length"),
      config.get("crypto.digest"),
      (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString("hex"));
      }
    );
  });
}

function generateSalt() {
  return new Promise((resolve, reject) => {
    randomBytes(config.get("crypto.length"), (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString("hex"));
    });
  });
}

userSchema.methods.setPassword = async function setPassword(password) {
  this.salt = await generateSalt();
  this.passwordHash = await generatePassword(this.salt, password);
};

userSchema.methods.checkPassword = async function (password) {
  if (!password) return false;

  const hash = await generatePassword(this.salt, password);
  return hash === this.passwordHash;
};
const User = connection.model("user", userSchema);

module.exports = User;
