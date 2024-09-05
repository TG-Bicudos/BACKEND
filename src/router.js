const express = require('express');
const router = express.Router();

const armadilhaController = require('./controllers/armadilhasController')
const armadilhaMiddleware = require('./middlewares/armadilhasMiddleware')

//Armadilhas
router.get('/armadilhas', armadilhaController.getAll);
router.post('/armadilhas', armadilhaMiddleware.validateBody, armadilhaController.createArmadilha);
router.delete('/armadilhas/:id', armadilhaController.deleteArmadilha);
router.put('/armadilhas/:id', armadilhaController.updateArmadilha);

module.exports = router;