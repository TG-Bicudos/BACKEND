const connection = require('../models/connection');

const validateIdDispositivo = async (req, res, next) => {
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
};

const validateNomePasta = async (req, res, next) => {
    const { body } = req;

    try {
        if (body.nome_pasta === undefined) {
            return res.status(400).json({ message: `O nome da pasta é obrigatório` });
        }

        if (body.nome_pasta.trim() === '') {
            return res.status(400).json({ message: `O campo 'Nome da pasta' não pode ser vazio` });
        }

        if (body.nome_pasta.length > 255) {
            return res.status(400).json({ message: `O nome da pasta não deve ter mais de 255 caracteres` });
        }

        if (body.id_pasta_drive === undefined) {
            return res.status(400).json({ message: `O link da pasta é obrigatório` });
        }

        if (body.id_pasta_drive.trim() === '') {
            return res.status(400).json({ message: `O campo 'Link da pasta' não pode ser vazio` });
        }

        if (body.id_pasta_drive.length > 255) {
            return res.status(400).json({ message: `O link da pasta não deve ter mais de 255 caracteres` });
        }

        next();
    } catch (error) {
        console.error("Erro ao validar o nome da pasta", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
};

const validateIdPasta = async (req, res, next) => {
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
};

// const validateForms = (req, res, next) => {
//     const invalidFields = Object.keys(req.body).filter(
//         key => typeof req.body[key] === 'string' && req.body[key].trim() === ''
//     );

//     if (invalidFields.length > 0) {
//         return res.status(400).json({
//             message: `Os campos não podem estar vazios ou conter apenas espaços: ${invalidFields.join(', ')}`
//         });
//     }

//     next();
// };

module.exports = {
    validateIdDispositivo,
    validateNomePasta,
    validateIdPasta,
    // validateForms
};
