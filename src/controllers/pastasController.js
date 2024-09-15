const pastasModel = require("../models/pastasModel")

const getAll = async (req, res) => {
    try {
        const [pastas] = await pastasModel.getAll();
        return res.status(200).json({ pastas });
    } catch (error) {
        console.error("Erro ao exibir a pasta", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    } 
};

const createPasta = async (req, res) => {
    try{
        const createdPasta = await pastasModel.createPasta(req.body);
        return res.status(201).json(createdPasta);
    } catch (error) {
        console.error("Erro ao criar a pasta", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
};

const deletePasta = async (req, res) => {
    try {
        const { id } = req.params;

        await pastasModel.deletePasta(id);
        return res.status(204).json();
    } catch (error) {
        console.error("Erro ao deletar a pasta", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
};

const updatePasta = async (req, res) => {
    try {
        const { id } = req.params;

        await pastasModel.updatePasta(id, req.body);
        return res.status(204).json();
    } catch (error) {
        console.error("Erro ao atualizar a pasta", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
};


module.exports = {
    getAll,
    createPasta,
    deletePasta,
    updatePasta
};