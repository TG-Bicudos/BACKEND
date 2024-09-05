const connection = require('./connection');

const getAll = async () => {
    const armadilhas = await connection.execute("SELECT * FROM Dispositivos");
    return armadilhas;
};

const createArmadilha = async (armadilha) => {
    const { nome, latitude, longitude } = armadilha;

    const query = "INSERT INTO Dispositivos(nome, latitude, longitude) VALUES (?, ?, ?)";

    const [createdArmadilha] = await connection.execute(query, [nome, latitude, longitude])

    return {insertId: createdArmadilha.insertId};
}

const deleteArmadilha = async (id) => {
    const deletedArmadilha = await connection.execute("DELETE FROM Dispositivos WHERE id = ?", [id])
    return deletedArmadilha
}

const updateArmadilha = async (id, armadilha) => {
    const { nome, latitude, longitude } = armadilha

    const query = "UPDATE Dispositivos SET nome = ?, latitude = ?, longitude = ? WHERE id = ?";

    const [updatedArmadilha] = await connection.execute(query, [nome, latitude, longitude, id]);
    return updatedArmadilha
}

module.exports = {
    getAll,
    createArmadilha,
    deleteArmadilha,
    updateArmadilha
};