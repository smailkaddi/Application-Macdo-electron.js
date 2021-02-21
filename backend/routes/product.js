// ____________________________Call Required______________________________________________
const express = require('express')
let Product = require('../models/product.model');
const router = express.Router();
const bodyParser = require('body-parser');
// middleware
router.use(bodyParser.json());

// ____________________________show all Codepromo__________________________________________
router.get('/', (req, res) => {
  Product.find()
    .then((Product) => res.json(Product))
    .catch((err) => res.status(400).json("Error :" + err));
});

// ____________________________FIND DATA CATEGORIE BY ID____________________________________
router.get('/:idSousCtg', (req, res) => {
  Product.find({
      sousCategory: `${req.params.idSousCtg}`
    })
    .then((Product) => res.json(Product))
    .catch((err) => res.status(400).json("Error :" + err));
});

// ____________________________add Codepromo____________________________________
router.route("/add").post((req, res) => {
  const nom = req.body.nom;
  const prix = req.body.prix;
  const picname = req.body.picname;
  const codePromo = req.body.codePromo;
  // ____________________________calcule d pint de fidelite ____________________________________ 

  let points = 0

  if (prix >= 7 && prix <= 20) {

    points = 5;

  } else if (prix >= 21 && prix <= 50) {

    points = 12;

  } else {
    points = 20;
  }
  const ingrediens = req.body.ingrediens;
  const sousCategory = req.body.sousCategory;
  console.log(nom,
    prix,
    ingrediens,
    picname,
    points,
    codePromo,
    sousCategory);
  const productPush = new Product({
    nom,
    prix,
    ingrediens,
    picname,
    points,
    codePromo,
    sousCategory
  });
  productPush
    .save()
    .then(() => res.json("Product successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
});

// ____________________________DELETE CODE PROMO___________________________________
router.delete('/delete/:_id', async (req, res, next) => {
  try {
    const product = await Product.remove({
      _id: req.params._id
    });
    res.json(product);
  } catch (err) {
    res.json({
      message: err
    });
  }
});


// ____________________________UPDATE CODE PROMO___________________________________

router.put('/update/:id', async (req, res, next) => {
  try {
    const updateProduct = await Product.updateMany({
      _id: req.params.id
    }, {
      $set: {
        nom: req.body.nom,
        prix: req.body.prix,
        ingrediens: req.body.ingrediens,
        picname: req.body.picname,
        codePromo: req.body.codePromo,
        sousCategory: req.body.sousCategory
      }
    });
    res.json(updateProduct);
  } catch (err) {
    res.json({
      err
    });
  }
});



module.exports = router;