const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SousCategory = new Schema({
  nom: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
}, {
  versionKey: false
});

const SousCategoryList = mongoose.model("SousCategory", SousCategory);
module.exports = SousCategoryList;
