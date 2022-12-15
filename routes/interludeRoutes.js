const express = require('express');
const router = express.Router();
const { check} = require('express-validator');

const interludeController = require('../controllers/interludeControllers');

router.post('/create', interludeController.createInterlude);
router.put('/update/:iid', interludeController.updateField);
router.post('/createact/:idd', interludeController.createAct);
router.put('/updateact/:idd', interludeController.updateAct);
router.get('/:iid', interludeController.getInterlude);




module.exports = router;