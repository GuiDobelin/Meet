const express = require('express');
const Room = require('../models/room');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/create', authMiddleware, async (req, res) => {
  const { name } = req.body;
  
  try {
    const newRoom = new Room({
      name,
      createdBy: req.user.userId,
    });

    await newRoom.save();

    res.status(201).json({ message: 'Sala criada com sucesso', room: newRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar a sala' });
  }
});

router.get('/list', authMiddleware, async (req, res) => {
  try {
    const rooms = await Room.find().populate('createdBy', 'name');
    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar as salas' });
  }
});

router.put('/:id/activate', authMiddleware, async (req, res) => {
  try {
    const roomId = req.params.id;

    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }

    room.isActive = !room.isActive;
    await room.save();

    const statusMessage = room.isActive ? 'ativada' : 'desativada';
    res.status(200).json({ message: `Sala ${statusMessage} com sucesso`, room });
  } catch (error) {
    console.error('Erro ao ativar/desativar a sala:', error.message);
    res.status(500).json({ message: 'Erro ao ativar/desativar a sala' });
  }
});


router.post('/:id/join', authMiddleware, async (req, res) => {
  try {
    console.log(req.params.id)
    const roomId = req.params.id;

    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }

    if (!room.isActive) {
      return res.status(400).json({ message: 'A sala não está ativa' });
    }

    return res.status(200).json({ message: 'Usuário entrou na sala', room });
  } catch (error) {
    console.error('Erro ao entrar na sala:', error.message);
    res.status(500).json({ message: 'Erro ao entrar na sala' });
  }
});

module.exports = router;
