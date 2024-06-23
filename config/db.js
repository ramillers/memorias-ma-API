const mongoose = require('mongoose'); // Importa o mongoose para lidar com o MongoDB
const dotenv = require('dotenv'); // Importa o dotenv para carregar as variáveis de ambiente

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

// Função assíncrona para conectar ao banco de dados MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Conecta ao MongoDB usando a URI do arquivo .env
    console.log('MongoDB conectado'); // Exibe uma mensagem de sucesso no console
  } catch (error) {
    console.error(`Error: ${error.message}`); // Exibe uma mensagem de erro no console
    process.exit(1); // Encerra o processo com erro
  }
};

module.exports = connectDB; // Exporta a função de conexão
