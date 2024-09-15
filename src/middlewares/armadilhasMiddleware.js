const validateNome = async (req, res, next) => {
  try {
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
  } catch (error) {
      console.error("Erro ao validar o nome da armadilha", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

function validateLatitude(req, res, next) {
  try{
    const latitude = req.body.latitude; 
  
    const latitudeRegex = /^-?([0-8]?\d(\,\d+)?|90(\,0+)?)$/;
  
    if (!latitudeRegex.test(latitude)) {
      return res.status(400).json({
        error: 'Formato de dado inválido, a latitude deve ser escrita dessa forma: "32,534534".'
      });
    }
  
    next();
  } catch (error) {
      console.error("Erro ao validar a latitude", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

function validateLongitude(req, res, next) {
    try{
      const longitude = req.body.longitude; 
  
      const longitudeRegex = /^-?([0-8]?\d(\,\d+)?|90(\,0+)?)$/;
    
      if (!longitudeRegex.test(longitude)) {
        return res.status(400).json({
          error: 'Formato de dado inválido, a longitude deve ser escrita dessa forma: "32,534534".'
        });
      }
  
      next();
    } catch (error) {
      console.error("Erro ao validar a longitude", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
}

module.exports = {
    validateNome,
    validateLatitude,
    validateLongitude
}