// ____________________________Call Required______________________________________________
const express = require('express')
let Category = require('../models/category.model');
const router = express.Router();
const bodyParser = require('body-parser');
// middleware
router.use(bodyParser.json());

// ____________________________show all CATEGORIE__________________________________________
router.get('/', (req, res) => {
  Category.find()
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json("Error :" + err));
});

// ____________________________FIND DATA CATEGORIE BY ID____________________________________
router.get('/:id', async (req, res, next) => {
  try {
    const Category = await Category.findById(req.params.id);
    res.json(Category);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

// ____________________________add Category____________________________________
router.route("/add").post((req, res) => {
  const nom = req.body.nom;
  const categoryPush = new Category({
    nom
  });
  categoryPush
    .save()
    .then(() => res.json("Category successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
  res.redirect('/category')
});

// ____________________________DELETE categorie___________________________________
router.delete('/delete/:_id', async (req, res, next) => {
  try {
    const category = await Category.remove({
      _id: req.params._id
    });
    res.json(category);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

// ____________________________UPDATE categorie___________________________________
router.put('/update/:id', async (req, res, next) => {
  try {
    const updateCategorie = await Category.updateOne({
      _id: req.params.id
    }, {
      $set: {
        nom: req.body.categorie_name
      }
    });
    res.json(updateCategorie);
  } catch (err) {
    res.json({
      message: err
    });
  }
});






module.exports = router;
