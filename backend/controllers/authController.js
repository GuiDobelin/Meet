const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'Email já está em uso' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      await user.save();
  
      res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Email ou senha incorretos' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Email ou senha incorretos' });
      }
  
      const token = jwt.sign(
      { userId: user._id, email:user.email}, process.env.JWT_SECRET,{expiresIn:'1h'},
      );
  
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
