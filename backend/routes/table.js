// ____________________________Call Required______________________________________________
const express = require('express')
let Table = require('../models/table.model');
const router = express.Router();
const bodyParser = require('body-parser');
// middleware
router.use(bodyParser.json());

// ____________________________show all TABLE__________________________________________
router.get('/', (req, res) => {
  Table.find()
    .then((Table) => res.json(Table))
    .catch((err) => res.status(400).json("Error :" + err));
});

// ____________________________FIND DATA Tbale BY ID____________________________________
router.get('/:id', async (req, res, next) => {
  try {
    const table = await Table.findById(req.params.id);
    res.json(table);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

// ____________________________add Category____________________________________
router.route("/add").post((req, res) => {
  const numTable = req.body.numTable;
  const isOcuped = req.body.isOcuped;
  const TablePush = new Table({
    numTable,
    isOcuped
  });
  TablePush
    .save()
    .then(() => res.json("Table successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));

});


// ____________________________DELETE Table___________________________________
router.delete('/delete/:_id', async (req, res, next) => {
  try {
    const table = await Table.remove({
      _id: req.params._id
    });
    res.json(table);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

// ____________________________UPDATE Tables___________________________________
router.put('/update/:id', async (req, res, next) => {
  try {
    const updateTable = await Table.updateMany({
      _id: req.params.id
    }, {
      $set: {
        numTable: req.body.numTable,
        isOcuped: req.body.isOcuped
      }
    });
    res.json(updateTable);
  } catch (err) {
    res.json({
      message: err
    });
  }
});








module.exports = router;