const Room = require('../models/room'); 

const createRoom = async (req, res) => {
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
};

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate('createdBy', 'name');
        res.status(200).json(rooms);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar as salas' });
      }
};

const joinRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
    
        const room = await Room.findOne({ roomId });
    
        if (!room) {
          return res.status(404).json({ message: 'Sala não encontrada' });
        }
    
        if (room.participants.includes(req.user._id)) {
            return res.status(400).json({ message: 'Você já está na sala' });
        }
    
        room.participants.push(req.user._id);
        await room.save(); 
        res.status(200).json({ message: 'Você entrou na sala com sucesso' });
      } catch (error) {
        console.error('Erro ao entrar na sala:', error.message);
        res.status(500).json({ message: 'Erro ao entrar na sala' });
      }
};

module.exports = {
    createRoom,
    getRooms,
    joinRoom,
};