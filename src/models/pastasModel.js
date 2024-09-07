const connection = require('./connection');

const getAll = async () => {
    const pastas = await connection.execute("SELECT * FROM Pastas");
    return pastas;
};

const createPasta = async (pasta) => {
    const { id_dispositivo, nome_pasta, id_pasta_drive } = pasta;

    const query = "INSERT INTO Pastas(id_dispositivo, nome_pasta, id_pasta_drive) VALUES (?, ?, ?)";

    const [createdPasta] = await connection.execute(query, [id_dispositivo, nome_pasta, id_pasta_drive])

    return {insertId: createdPasta.insertId};
}

const deletePasta = async (id) => {
    const deletedPasta = await connection.execute("DELETE FROM Pastas WHERE id = ?", [id])
    return deletedPasta
}

const updatePasta = async (id, pasta) => {
    const { id_dispositivo, nome_pasta, id_pasta_drive } = pasta

    const query = "UPDATE Pastas SET id_dispositivo = ?, nome_pasta = ?, id_pasta_drive = ? WHERE id = ?";

    const [updatedPasta] = await connection.execute(query, [id_dispositivo, nome_pasta, id_pasta_drive, id]);
    return updatedPasta
}

module.exports = {
    getAll,
    createPasta,
    deletePasta,
    updatePasta
};