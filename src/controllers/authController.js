const User = require('../models/userModel'); // Importa o modelo User
const jwt = require('jsonwebtoken'); // Importa o jwt para gerar tokens
const bcrypt = require('bcryptjs'); // Importa o bcryptjs para criptografar senhas
const { sendResetEmail } = require('../utils/email'); // Importa a função de envio de e-mail
const dotenv = require('dotenv'); // Importa o dotenv para carregar as variáveis de ambiente

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

// Função para gerar token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expira em 30 dias
  });
};

// Controller para registro de usuário
exports.register = async (req, res) => {
  const { name, username, birthdate, email, city, state, password, confirmPassword } = req.body;

  // Verifica se as senhas coincidem
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // RegEx para validar a senha (pelo menos 8 caracteres com letras maiúsculas, minúsculas, números e caracteres especiais)
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(password) || password.includes(username)) {
    return res.status(400).json({ message: 'Password does not meet criteria' });
  }

  try {
    // Verifica se o usuário já existe pelo e-mail
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Criptografa a senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria um novo usuário
    const user = await User.create({
      name,
      username,
      birthdate,
      email,
      city,
      state,
      password: hashedPassword, // Salva a senha criptografada
    });

    // Retorna os dados do usuário com um token JWT
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller para login de usuário
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica se o usuário existe pelo e-mail
    const user = await User.findOne({ email });

    // Verifica se o usuário existe e se a senha está correta
    if (user && (await bcrypt.compare(password, user.password))) {
      // Retorna os dados do usuário com um token JWT
      res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller para envio de e-mail de recuperação de senha
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Verifica se o usuário existe pelo e-mail
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Gera um token JWT para resetar a senha e envia por e-mail
    const token = generateToken(user._id);
    await sendResetEmail(user.email, token);

    res.json({ message: 'Reset email sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller para resetar a senha do usuário
exports.resetPassword = async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;

  // Verifica se as senhas coincidem
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // RegEx para validar a senha (pelo menos 8 caracteres com letras maiúsculas, minúsculas, números e caracteres especiais)
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    return res.status(400).json({ message: 'Password does not meet criteria' });
  }

  try {
    // Verifica se o token JWT é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Busca o usuário pelo ID no token JWT
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Criptografa a nova senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
