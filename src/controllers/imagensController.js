const imagensModel = require("../models/imagensModel")

const getAll = async (req, res) => {
    const { id_pasta } = req.params;

    const [pastas] = await imagensModel.getAll(id_pasta);

    return res.status(200).json({ pastas });
};

const createImagem = async (req, res) => {  
    const createdImagem = await imagensModel.createImagem(req.body);
    return res.status(201).json(createdImagem);
};  

const deleteImagem = async (req, res) => {
    const { id } = req.params;

    await imagensModel.deleteImagem(id);
    return res.status(204).json();
};


module.exports = {
    getAll,
    createImagem,
    deleteImagem,
};