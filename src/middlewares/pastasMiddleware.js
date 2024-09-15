const connection = require('../models/connection')

const validadeIdDispositivo = async (req, res, next) => {
    const { id_dispositivo } = req.body;

    try {
        const query = "SELECT * FROM Dispositivos WHERE id = ?";
        const [rows] = await connection.execute(query, [id_dispositivo]);

        if (rows.length < 1) {
            return res.status(400).json({ message: "Essa armadilha não existe" });
        }

        next();
    } catch (error) {
        console.error("Erro ao verificar dispositivo", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}

const validateNomePasta = async (req, res, next) => {
    const { body } = req;

    try {
        if (body.nome_pasta === undefined) {
            return res.status(400).json({ message: `O nome da pasta é obrigatório` })
        }
    
        if (body.nome_pasta === '') {
            return res.status(400).json({ message: `O campo 'Nome da pasta' não pode ser vazio` })
        }
    
        if (body.nome_pasta.length > 255) {
            return res.status(400).json({ message: `O nome da pasta não deve ter mais de 255 caracteres` })
        }
    
        next();
    } catch (error) {
        console.error("Erro ao validar o nome da pasta", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}

const validadeIdPasta = async (req, res, next) => {
    const { id } = req.params;

    try {
        const query = "SELECT * FROM Pastas WHERE id = ?";
        const [rows] = await connection.execute(query, [id]);

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
    validadeIdDispositivo,
    validateNomePasta,
    validadeIdPasta
}