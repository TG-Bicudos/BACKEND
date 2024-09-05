const validateBody = async (req, res, next) => {
    const { body } = req;

    if (body.nome === undefined) {
        return res.status(400).json({ message: `O campo 'Nome' é obrigatório` })
    }

    if (body.nome === '') {
        return res.status(400).json({ message: `O campo 'Nome' não pode ser vazio` })
    }

    next();

}

module.exports = {
    validateBody,
}