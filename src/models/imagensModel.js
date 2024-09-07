const connection = require('./connection');

const getAll = async (id_pasta) => {
    const imagens = await connection.execute("SELECT * FROM Imagens WHERE id_pasta = ?", [id_pasta]);
    return imagens;
};

const createImagem = async (imagem) => {
    const { id_pasta, nome_imagem, id_imagem_drive, data } = imagem;

    const query = "INSERT INTO Imagens(id_pasta, nome_imagem, id_imagem_drive, data) VALUES (?, ?, ?, ?)";

    const [createdImagem] = await connection.execute(query, [id_pasta, nome_imagem, id_imagem_drive, data])

    return {insertId: createdImagem.insertId};
}

const deleteImagem = async (id) => {
    const deletedImagem = await connection.execute("DELETE FROM Imagens WHERE id = ?", [id])
    return deletedImagem
}

module.exports = {
    getAll,
    createImagem,
    deleteImagem,
};