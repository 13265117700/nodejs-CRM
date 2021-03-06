var express = require('express');
var router = express.Router();
var userController = require('./../controllers/user');
var clueController = require('./../controllers/clue');
var authController = require('./../controllers/auth.js');

router.post('/user',userController.insert);
router.put('/user/:id',userController.update);
router.post('/clue',clueController.insert);
router.post('/login',authController.login);
router.put('/clue/:id',clueController.update);
router.post('/clue/:id/log',clueController.addLog);
module.exports = router;
