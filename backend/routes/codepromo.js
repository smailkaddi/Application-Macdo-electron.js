// ____________________________Call Required______________________________________________
const express = require('express')
let Codepromo = require('../models/codepromo.model');
const router = express.Router();
const bodyParser = require('body-parser');
// middleware
router.use(bodyParser.json());


// ____________________________show all Codepromo__________________________________________
router.get('/', (req, res) => {
  Codepromo.find()
    .then((Codepromo) => res.json(Codepromo))
    .catch((err) => res.status(400).json("Error :" + err));
});


// ____________________________FIND DATA CATEGORIE BY ID____________________________________
router.get('/:id', async (req, res, next) => {
  try {
    const Codepromo = await Codepromo.findById(req.params.id);
    res.json(Codepromo);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

// ____________________________add Codepromo____________________________________
router.route("/add").post((req, res) => {
  const code = req.body.code;
  const isValid = req.body.isValid;
  const pourcentage = req.body.pourcentage;
  const CodepromoPush = new Codepromo({
    code,
    isValid,
    pourcentage
  });
  CodepromoPush
    .save()
    .then(() => res.json("Category successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
  res.redirect('/Codepromo')
});

// ____________________________DELETE CODE PROMO___________________________________
router.delete('/delete/:_id', async (req, res, next) => {
  try {
    const codepromo = await Codepromo.remove({
      _id: req.params._id
    });
    res.json(codepromo);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

// ____________________________UPDATE CODE PROMO___________________________________

router.put('/update/:id', async (req, res, next) => {
  try {
    const updateCodepromo = await Codepromo.updateMany({
      _id: req.params.id
    }, {
      $set: {
        code: req.body.code,
        pourcentage: req.body.pourcentage,
        isValid: req.body.isValid
      }
    });
    res.json(updateCodepromo);
  } catch (err) {
    res.json({
      err
    });
  }
});




module.exports = router;