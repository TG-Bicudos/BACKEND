const imagensModel = require("../models/imagensModel")

const getAll = async (req, res) => {
    try {
        const { id_pasta } = req.params;

        const [imagens] = await imagensModel.getAll(id_pasta);

        return res.status(200).json({ imagens });
    } catch (error) {
        console.error("Erro ao exibir as imagens", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    } 
};

const getImagensDispositivos = async (req, res) => {
    try {
        const { id_dispositivo } = req.params;

        const [imagens] = await imagensModel.getImagensDispositivos(id_dispositivo);

        return res.status(200).json({ imagens });
    } catch (error) {
        console.error("Erro ao exibir as imagens", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    } 
};

const createImagem = async (req, res) => {
    try {  
        const createdImagem = await imagensModel.createImagem(req.body);
        return res.status(201).json(createdImagem);
    } catch (error) {
        console.error("Erro ao adicionar a imagem", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    } 
};  

const deleteImagem = async (req, res) => {
    try{
        const { id } = req.params;

        await imagensModel.deleteImagem(id);
        return res.status(204).json();
    } catch (error) {
        console.error("Erro ao adicionar a imagem", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    } 
};


module.exports = {
    getAll,
    createImagem,
    deleteImagem,
    getImagensDispositivos
};