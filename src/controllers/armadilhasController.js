const armadilhaModel = require("../models/armadilhasModel")

const getAll = async (req, res) => {
    try {
        const [armadilhas] = await armadilhaModel.getAll();
        return res.status(200).json({ armadilhas });
    } catch (error) {
        console.error("Erro ao exibir as armadilhas", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    } 
};

const createArmadilha = async (req, res) => {
    try {
        const createdArmadilha = await armadilhaModel.createArmadilha(req.body);
        return res.status(201).json(createdArmadilha);
    } catch (error) {
        console.error("Erro ao criar a armadilha", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    } 
};

const deleteArmadilha = async (req, res) => {
    try {
        const { id } = req.params;

        await armadilhaModel.deleteArmadilha(id);
        return res.status(204).json();
    } catch (error) {
        console.error("Erro ao deletar a armadilha", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    } 
};

const updateArmadilha = async (req, res) => {
    try {
        const { id } = req.params;

        await armadilhaModel.updateArmadilha(id, req.body);
        return res.status(204).json();
    } catch (error) {
        console.error("Erro ao atualizar a armadilha", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    } 
};


module.exports = {
    getAll,
    createArmadilha,
    deleteArmadilha,
    updateArmadilha
};