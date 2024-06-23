const express = require('express'); // Importa o express para criar a aplicação
const dotenv = require('dotenv'); // Importa o dotenv para carregar as variáveis de ambiente
const connectDB = require('./config/db'); // Importa a função de conexão com o banco de dados
const authRoutes = require('./src/routes/authRoutes'); // Importa as rotas de autenticação
const scoreRoutes = require('./src/routes/scoreRoutes'); // Importa as rotas de pontuação

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

connectDB(); // Conecta ao banco de dados

const app = express(); // Cria uma nova aplicação express

app.use(express.json()); // Middleware para parsear o corpo das requisições como JSON


// Define as rotas da aplicação
app.use('/api/auth', authRoutes);
app.use('/api/scores', scoreRoutes);

const PORT = process.env.PORT || 5000; // Define a porta da aplicação

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
