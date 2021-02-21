const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Codepromo = new Schema({
  code: {
    type: String,

  },
  isValid: {
    type: Boolean,
    default: true,

  },
  pourcentage: {
    type: Number,

  }
}, {
  versionKey: false
});

const CodepromoList = mongoose.model("Codepromo", Codepromo);
module.exports = CodepromoList;
