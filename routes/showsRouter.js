const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { Show } = require('../models/Show');

router.get("/", async (req, res) => {
  res.send(await Show.findAll());
});

router.get("/:genre", async (req, res) => {
  let showsByGenre = await Show.findAll({ where: { genre: req.params.genre } });
  res.send({ showsByGenre });
});

router.get("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  res.json(show);
});

router.post('/',
  [check("status").not().isEmpty().trim()],
  [check("status").isLength({ min: 5, max: 25 })],
  [check("rating").not().isEmpty().trim()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.array() })
    }
    else {
        const { title, genre, rating, status } = req.body;
        const newShow = await Show.create({ title, genre, rating, status });
        res.status(201).send({ newShow });
    }
});

// router.put("/:id", async (req, res) => {
//   const singleShow = await Show.findByPk(req.params.id);
//   const { title, genre, rating, status } = req.body;
//   singleShow.update({ title, genre, rating, status });
//   res.status(201).send(singleShow);
// })

router.put("/:id/rating",
  [check("rating").not().isEmpty().trim()],
  async (req, res) => {
   const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ error: errors.array() })
  } else {

    const singleShow = await Show.findByPk(req.params.id);
    await singleShow.update({ rating: req.body.rating });
    res.status(201).send(singleShow);
  }
});

router.put("/:id/status",
  [check("status").not().isEmpty().trim()],
  [check("status").isLength({ min: 5, max: 25 })],
  async (req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ error: errors.array() })
  } else {
    const singleShow = await Show.findByPk(req.params.id);
    await singleShow.update({ rating: req.body.status });
    res.status(201).send(singleShow);
  }
});

router.delete("/:id", async (req, res) => {
    const singleShow = await Show.findByPk(req.params.id);
    await singleShow.destroy();
    res.sendStatus(204);
});

module.exports = router;