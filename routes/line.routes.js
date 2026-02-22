const { Router } = require('express');
const router = Router();

const lineController = require('../controllers/line.controller');

router.post('/', lineController.sendMessage);

module.exports = router;
