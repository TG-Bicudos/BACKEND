const express = require('express');
const router = express.Router();

const armadilhaController = require('./controllers/armadilhasController');
const armadilhaMiddleware = require('./middlewares/armadilhasMiddleware');

const pastasController = require('./controllers/pastasController');
const pastasMiddleware = require('./middlewares/pastasMiddleware');

const imagensController = require('./controllers/imagensController');
const imagensMiddleware = require('./middlewares/imagensMiddleware');


//Armadilhas
router.get('/armadilhas', armadilhaController.getAll);
router.post('/armadilhas', armadilhaMiddleware.validateNome, armadilhaMiddleware.validateLatitude, armadilhaMiddleware.validateLongitude, armadilhaController.createArmadilha);
router.delete('/armadilhas/:id', armadilhaController.deleteArmadilha);
router.put('/armadilhas/:id', armadilhaController.updateArmadilha);


//Pastas
router.get('/pastas', pastasController.getAll);
router.post('/pastas', pastasMiddleware.validadeIdDispositivo, pastasMiddleware.validateNomePasta, pastasController.createPasta);
router.delete('/pastas/:id', pastasController.deletePasta);
router.put('/pastas/:id', pastasMiddleware.validadeIdPasta, pastasMiddleware.validadeIdDispositivo, pastasMiddleware.validateNomePasta, pastasController.updatePasta);


//Imagens
router.get('/imagens/:id_pasta', imagensController.getAll);
router.get('/imagens/dispositivos/:id_dispositivo', imagensController.getImagensDispositivos);
router.post('/imagens', imagensMiddleware.validateNomeImagem, imagensMiddleware.validadeIdPasta, imagensController.createImagem);
router.delete('/imagens/:id', imagensController.deleteImagem);

module.exports = router;