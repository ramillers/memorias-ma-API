const mongoose = require('mongoose'); // Importa o mongoose para definir o esquema
const bcrypt = require('bcryptjs'); // Importa o bcryptjs para criptografar senhas

// Define o esquema do usuário
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Nome é obrigatório
  },
  username: {
    type: String,
    required: true, // Nome de usuário é obrigatório
    unique: true, // Nome de usuário deve ser único
  },
  birthdate: {
    type: Date,
    required: true, // Data de nascimento é obrigatória
  },
  email: {
    type: String,
    required: true, // E-mail é obrigatório
    unique: true, // E-mail deve ser único
  },
  city: {
    type: String,
    required: true, // Cidade é obrigatória
  },
  state: {
    type: String,
    required: true, // Estado é obrigatório
  },
  password: {
    type: String,
    required: true, // Senha é obrigatória
  },
}, {
  timestamps: true // Adiciona timestamps para createdAt e updatedAt
});

module.exports = mongoose.model('User', userSchema); // Exporta o modelo User
