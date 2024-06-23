const express = require('express'); // Importa o express para criar o roteador
const router = express.Router(); // Cria uma nova instância de roteador
const { register, login, forgotPassword, resetPassword } = require('../controllers/authController'); // Importa os controladores de autenticação

// Rota de registro de usuário
router.post('/register', register);

// Rota de login de usuário
router.post('/login', login);

// Rota para enviar e-mail de recuperação de senha
router.post('/forgot-password', forgotPassword);

// Rota para resetar a senha do usuário
router.post('/reset-password', resetPassword);

module.exports = router; // Exporta o roteador
