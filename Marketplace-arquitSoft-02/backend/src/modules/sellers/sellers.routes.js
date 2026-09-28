// CAPA 1 - PRESENTACIÓN: rutas del módulo sellers
const { Router } = require('express');
const controller = require('./sellers.controller');

const router = Router();

router.get('/', controller.listar);

module.exports = router;
