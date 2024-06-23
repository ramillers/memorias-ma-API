// Importa o mongoose para definir o esquema e o modelo
const mongoose = require('mongoose');

// Define o esquema de pontuação do usuário
const scoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Tipo de dado do campo user (referência ao modelo User)
    ref: 'User', // Referencia ao modelo User
    required: true, // Campo obrigatório
  },
  score: {
    type: Number, // Tipo de dado do campo score (número)
    required: true, // Campo obrigatório
  },
}, {
  timestamps: true, // Adiciona campos de carimbo de tempo (createdAt e updatedAt)
});

// Cria o modelo de pontuação com base no esquema definido
const Score = mongoose.model('Score', scoreSchema);

// Exporta o modelo de pontuação para ser utilizado em outros arquivos
module.exports = Score;
