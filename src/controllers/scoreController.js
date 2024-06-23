// Importa o modelo de pontuação e o modelo de usuário
const Score = require('../models/scoreModel');
const User = require('../models/userModel');

// Função para salvar ou atualizar a pontuação do usuário
exports.saveScore = async (req, res) => {
  const { username, score } = req.body; // Extrai o nome de usuário e a pontuação do corpo da requisição

  try {
    // Encontra o usuário pelo nome de usuário
    const user = await User.findOne({ username });

    // Se o usuário não for encontrado, retorna um erro 404
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Encontra a pontuação do usuário pelo ID do usuário
    let userScore = await Score.findOne({ user: user._id });

    // Se a pontuação já existir, atualiza a pontuação existente
    if (userScore) {
      userScore.score = score;
      await userScore.save(); // Salva a pontuação atualizada no banco de dados
    } else {
      // Se a pontuação não existir, cria uma nova entrada de pontuação
      userScore = new Score({
        user: user._id,
        score,
      });
      await userScore.save(); // Salva a nova pontuação no banco de dados
    }

    // Retorna uma resposta de sucesso com a pontuação do usuário
    res.status(200).json(userScore);
  } catch (error) {
    // Em caso de erro, retorna uma resposta de erro 500 com a mensagem de erro
    res.status(500).json({ message: error.message });
  }
};
