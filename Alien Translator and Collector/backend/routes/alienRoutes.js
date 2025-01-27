const express = require('express');
const {getAliens, addAlien, updateAlien, deleteAlien} = require('../controllers/alienController');
const router = express.Router();

router.get('/', getAliens);
router.post('/', addAlien);
router.put('/:id', updateAlien);
router.delete('/:id', deleteAlien);


module.exports = router;