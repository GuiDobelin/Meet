const express = require('express');
const router = express.Router();
const { createRoom, getRooms, joinRoom } = require('../controllers/roomController'); 

const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, createRoom);  
router.get('/list', authMiddleware, getRooms);           
router.post('/:id/join', authMiddleware, joinRoom);  

module.exports = router;
