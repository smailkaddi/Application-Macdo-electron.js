// ____________________________Call Required______________________________________________
const express = require('express')
let SousCategory = require('../models/sousCategory.model');
const router = express.Router();
const bodyParser = require('body-parser');
// middleware
router.use(bodyParser.json());

// ____________________________show all CATEGORIE__________________________________________
router.get('/', (req, res) => {
  // res.render('index');
  SousCategory.find()
    .populate('category')
    .then((SousCategory) => res.json(SousCategory))
    .catch((err) => res.status(400).json("Error :" + err));
});

// ____________________________FIND DATA CATEGORIE BY ID____________________________________
router.get('/:idCtg', (req, res) => {
  SousCategory.find({
      category: `${req.params.idCtg}`
    })
    .then((SousCategory) => res.json(SousCategory))
    .catch((err) => res.status(400).json("Error :" + err));
});

// ____________________________add Category____________________________________
router.route("/add").post((req, res) => {
  const nom = req.body.nom;
  const category = req.body.category;
  const sousCategoryPush = new SousCategory({
    nom,
    category
  });
  sousCategoryPush
    .save()
    .then(() => res.json("Sous Category successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
  res.redirect('/sousCategory')
});

// ____________________________DELETE categorie___________________________________
router.delete('/delete/:_id', async (req, res, next) => {
  try {
    const Souscategory = await SousCategory.remove({
      _id: req.params._id
    });
    res.json(Souscategory);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

// ____________________________UPDATE categorie___________________________________
router.put('/update/:id', async (req, res, next) => {
  try {
    const Souscategory = await SousCategory.updateOne({
      _id: req.params.id
    }, {
      $set: {
        nom: req.body.nom
      }
    });
    res.json(Souscategory);
  } catch (err) {
    res.json({
      message: err
    });
  }
});



module.exports = router;