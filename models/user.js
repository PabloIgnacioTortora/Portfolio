"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
UserSchema.plugin(beautifyUnique);

UserSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.statics.comparePassword = async (password, recivedPassword) => {
  return await bcrypt.compare(password, recivedPassword);
};

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
