const express = require('express');
const router = express.Router();
const { check} = require('express-validator');

const usersController = require('../controllers/usersController');

router.get('/get/:uid', usersController.getUserDoc);

router.post('/signup',
  [
    check('username')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  usersController.signup
);
router.post('/signin', usersController.signin);

router.post('/update/:uid', usersController.updateField);

router.post('/push/:uid', usersController.pushField);

module.exports = router;