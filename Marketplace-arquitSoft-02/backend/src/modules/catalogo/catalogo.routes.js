// CAPA 1 - PRESENTACIÓN: rutas del módulo catalogo
const { Router } = require('express');
const controller = require('./catalogo.controller');

const router = Router();

router.get('/', controller.listar);

module.exports = router;
