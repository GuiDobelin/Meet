// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/room');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error)
);

app.use('/api/auth', authRoutes);

app.use('/api/rooms', roomRoutes);

app.get('/api/private', authMiddleware, (req, res) => {
  res.json({ message: 'Acesso concedido à rota protegida', user: req.user });
});

// Rota inicial para teste
app.get('/', (req, res) => {
  res.send('Servidor rodando...');
});

// Configurando a porta do servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
