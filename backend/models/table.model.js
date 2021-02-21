const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Table = new Schema({
  numTable: {
    type: String,
  },
  isOcuped: {
    type: Boolean,
    defult: true
  }

}, {
  versionKey: false
});

const TableList = mongoose.model("Table", Table);
module.exports = TableList;
