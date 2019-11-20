const express = require('express')
const router = express.Router()
const Park = require("../models/park.model.js");

// Aquí los endpoints
router.get('/new-park', (req,res) => {
    res.render('parks/new-park');
});


router.post("/new-park", (req, res, next) => {
  Park.create({
    name: req.body.name,
    description: req.body.descripcion,
    active: true
  })
    .then(() => res.redirect("/"))
});

module.exports = router