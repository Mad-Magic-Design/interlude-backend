const express = require('express');
const router = express.Router();
const { check} = require('express-validator');

const interludesController = require('../controllers/interludesController');

router.post('/create', interludesController.createInterlude);
router.put('/update/:iid', interludesController.updateField);
router.post('/createact/:idd', interludesController.createAct);
router.put('/updateact/:idd', interludesController.updateAct);
router.get('/:iid', interludesController.getInterlude);




module.exports = router;