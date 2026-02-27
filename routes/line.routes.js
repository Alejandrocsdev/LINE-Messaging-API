const { Router } = require('express');
const router = Router();

const lineController = require('../controllers/line.controller');

const { lineGuard } = require('../middlewares');

router.get('/user', lineController.getUsers);
router.get('/group', lineController.getGroups);
router.post('/webhook', lineGuard, lineController.webhook);
router.post('/message', lineController.sendMessage);

module.exports = router;
