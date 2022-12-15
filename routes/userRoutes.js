const express = require('express');
const router = express.Router();
const { check} = require('express-validator');

const usersController = require('../controllers/userControllers');

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

router.post('/update/:uid', userController.updateField);

router.post('/push/:uid', userController.pushField);

module.exports = router;