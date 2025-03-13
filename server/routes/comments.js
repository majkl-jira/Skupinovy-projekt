const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  res.send("");
});

router.get('/:id', (req, res, next) => {
  res.send("");
});

router.post('/', (req, res, next) => {
  res.send("");
});

router.put('/:id', (req, res, next) => {
  res.send("");
});

router.delete('/:id', (req, res, next) => {
  res.send("");
});

module.exports = router;
