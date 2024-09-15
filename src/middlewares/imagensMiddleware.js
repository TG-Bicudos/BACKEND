const connection = require('../models/connection')

const validateNomeImagem = async (req, res, next) => {
    try {
        const { body } = req;
        
        if (body.nome_imagem === undefined) {
            return res.status(400).json({ message: `O nome da imagem é obrigatório` })
        }
    
        if (body.nome_imagem === '') {
            return res.status(400).json({ message: `O campo 'Nome da imagem' não pode ser vazio` })
        }
    
        if (body.nome_imagem.length > 255) {
            return res.status(400).json({ message: `O nome da imagem não deve ter mais de 255 caracteres` })
        }
    
        next();
    } catch (error) {
        console.error("Erro ao validar o nome da imagem", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
    
}

const validadeIdPasta = async (req, res, next) => {
    try {
        const { id_pasta } = req.body;

        const query = "SELECT * FROM Pastas WHERE id = ?";
        const [rows] = await connection.execute(query, [id_pasta]);

        if (rows.length < 1) {
            return res.status(400).json({ message: "Essa pasta não existe" });
        }

        next();
    } catch (error) {
        console.error("Erro ao verificar pasta", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}

module.exports = {
    validateNomeImagem,
    validadeIdPasta
}