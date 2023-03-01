const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { User, Show } = require('../models/index');

router.get("/", async (req, res) => {
  res.send(await User.findAll());
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

router.get("/:id/shows", async (req, res) => { 
  const showsWatchedByUser = await User.findByPk(req.params.id, {include: Show })
  res.send({ showsWatchedByUser });
})

router.post('/', [check("username").not().isEmpty().trim()], [check("username").isLength( { min: 5, max: 25 })], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.array() })
    }
    else {
        const { username, password } = req.body;
        const newUser = await User.create({ username, password });
        res.status(201).send({ newUser });
    }
});

router.put("/:id", async (req, res) => {
  const singleUser = await User.findByPk(req.params.id);
  const { username, password } = req.body;
  singleShow.update({ username, password });
  res.status(201).send(singleUser);
})

router.put("/:id/shows/:showsId", async (req, res) => {
  const singleUser = await User.findByPk(req.params.id);
  await singleUser.addShow(req.params.showsId);
  res.status(201).send(singleUser);
})

router.delete("/:id", async (req, res) => {
    const singleUser = await User.findByPk(req.params.id);
    await singleUser.destroy();
    res.sendStatus(204);
});

module.exports = router;