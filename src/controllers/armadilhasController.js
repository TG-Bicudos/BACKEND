const armadilhaModel = require("../models/armadilhasModel")

const getAll = async (req, res) => {

    const [armadilhas] = await armadilhaModel.getAll();

    return res.status(200).json({ armadilhas });
};

const createArmadilha = async (req, res) => {
    const createdArmadilha = await armadilhaModel.createArmadilha(req.body);
    return res.status(201).json(createdArmadilha);
};

const deleteArmadilha = async (req, res) => {
    const { id } = req.params;

    await armadilhaModel.deleteArmadilha(id);
    return res.status(204).json();
};

const updateArmadilha = async (req, res) => {
    const { id } = req.params;

    await armadilhaModel.updateArmadilha(id, req.body);
    return res.status(204).json();
};


module.exports = {
    getAll,
    createArmadilha,
    deleteArmadilha,
    updateArmadilha
};