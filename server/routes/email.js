const express = require('express');
const Email = require('../controllers/email');
const router = express.Router();

router.post('/contact', Email.sendContactEmail);

module.exports = router;