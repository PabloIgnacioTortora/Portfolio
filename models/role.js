"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.models.Role || mongoose.model("Role", roleSchema);
