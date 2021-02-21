const express = require('express')
let PointFidelite = require('../models/pointFidelite.modael');
const router = express.Router();

// show all Codepromo


router.get('/:idClient', (req, res) => {

  PointFidelite.findOne({
      idClient: req.params.idClient
    })
    .then((PointFidelite) => res.json(PointFidelite))
    .catch((err) => res.status(400).json("Error :" + err));
});


// add category

router.route("/add").post((req, res) => {
  const idClient = req.body.idClient;
  const nbPoint = req.body.nbPoint;





  const PointFidelitePush = new PointFidelite({

    idClient,
    nbPoint


  });

  PointFidelitePush
    .save()
    .then(() => res.json("cart  successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));

});



router.route("/update/:cartFidilite").put((req, res) => {




  PointFidelite.updateOne({
      idClient: req.params.cartFidilite
    }, {
      nbPoint: req.body.nbPoint
    })
    .then(() => res.status(201).json("point updated "))
    .catch((err) => res.status(400).json("Error :" + err));
})





module.exports = router;