const validateNome = async (req, res, next) => {
    const { body } = req;

    if (body.nome === undefined) {
        return res.status(400).json({ message: `O campo 'Nome' é obrigatório` })
    }

    if (body.nome === '') {
        return res.status(400).json({ message: `O campo 'Nome' não pode ser vazio` })
    }

    if (body.nome.length > 255) {
        return res.status(400).json({ message: `O nome da armadilha não deve ter mais de 255 caracteres` })
    }

    next();

}

function validateLatitude(req, res, next) {
    const latitude = req.body.latitude; 
  
    const latitudeRegex = /^-?([0-8]?\d(\,\d+)?|90(\,0+)?)$/;
  
    if (!latitudeRegex.test(latitude)) {
      return res.status(400).json({
        error: 'Formato de dado inválido, a latitude deve ser escrita dessa forma: "32,534534".'
      });
    }
  
    next();
}

function validateLongitude(req, res, next) {
    const longitude = req.body.longitude; 
  
    const longitudeRegex = /^-?([0-8]?\d(\,\d+)?|90(\,0+)?)$/;
  
    if (!longitudeRegex.test(longitude)) {
      return res.status(400).json({
        error: 'Formato de dado inválido, a longitude deve ser escrita dessa forma: "32,534534".'
      });
    }
  
    next();
}

module.exports = {
    validateNome,
    validateLatitude,
    validateLongitude
}