// Importa o express e o controlador de pontuação
const express = require('express');
const { saveScore } = require('../controllers/scoreController');

// Cria uma nova instância de roteador do express
const router = express.Router();

// Define a rota POST para salvar ou atualizar a pontuação do usuário
router.post('/feedback', saveScore);

// Exporta o roteador para ser utilizado em outros arquivos
module.exports = router;
