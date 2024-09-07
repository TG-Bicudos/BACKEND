const pastasModel = require("../models/pastasModel")

const getAll = async (req, res) => {

    const [pastas] = await pastasModel.getAll();

    return res.status(200).json({ pastas });
};

const createPasta = async (req, res) => {
    const createdPasta = await pastasModel.createPasta(req.body);
    return res.status(201).json(createdPasta);
};

const deletePasta = async (req, res) => {
    const { id } = req.params;

    await pastasModel.deletePasta(id);
    return res.status(204).json();
};

const updatePasta = async (req, res) => {
    const { id } = req.params;

    await pastasModel.updatePasta(id, req.body);
    return res.status(204).json();
};


module.exports = {
    getAll,
    createPasta,
    deletePasta,
    updatePasta
};