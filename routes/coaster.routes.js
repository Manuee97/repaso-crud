const express = require("express");
const router = express.Router();
const Coaster = require("../models/coaster.model.js");
const Park = require("../models/park.model.js");

// Aquí los endpoint
router.get("/", (req, res) => {
  Coaster.find()
    .select({ name: 1, _id: 1, descripcion: 1, inversions: 1, length: 1 })
    .populate("park")
    .then(coasters => {
      res.render("coasters/coasters-index", { coasters });
    });
});

router.get("/new-coaster", (req, res) => {
  Park.find()
    .select({ name: 1, _id: 1 })
    .then(parks => {
      res.render("coasters/new-coaster", { parks });
    });
});

router.post("/new-coaster", (req, res, next) => {
  Coaster.create({
    name: req.body.name,
    description: req.body.descripcion,
    inversions: req.body.inversions,
    length: req.body.length,
    active: true,
    park: req.body.park
  }).then(() => res.redirect("/"));
});

router.get("/coasters-index", (req, res) => {
  Coaster.find()
    .select({ name: 1, _id: 1, descripcion: 1, inversions: 1, length: 1 })
    .populate("park")
    .then(coasters => {
      res.render("coasters/coasters-index", { coasters });
    });
});

router.get("/:id", (req, res, next) => {
  Coaster.findById(req.params.id)
    .populate("park")
    .then(placeData =>
      //res.json(placeData)
      res.render("coasters/coaster-details", { coaster: placeData })
    );
});

router.get("/:id/delete", (req, res, next) => {
  Coaster.findByIdAndDelete(req.params.id)
    .populate("park")
    .then(deletedPlace => res.redirect("/"))
    .catch(function() {
      next();
      throw new Error("Error");
    });
});

router.get("/:id/coaster-edit", (req, res, next) => {
  let coaster;

  Coaster.find()
    .then(resultCoaster => {
      coaster = resultCoaster[0];
      Park.find()
        .select({ name: 1, _id: 1 })
        .then(parks => {
          res.render("coasters/coaster-edit", { parks, coaster });
        });
    });
});

router.post("/coaster-edit", (req, res) => {
    // console.log(req.body.id)
      Coaster.findByIdAndUpdate( req.body.id, {
        name: req.body.name,
        description: req.body.descripcion,
        inversions: req.body.inversions,
        length: req.body.length,
        active: true,
        park: req.body.park
      }).then(() => res.redirect("/"));
  res.redirect("/");
});

module.exports = router;
