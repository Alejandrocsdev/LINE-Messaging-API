const { Router } = require('express');
const router = Router();

const lineController = require('../controllers/line.controller');

const { lineGuard } = require('../middlewares');

router.post('/', lineController.sendMessage);
router.post('/webhook', lineGuard, lineController.webhook);

module.exports = router;
