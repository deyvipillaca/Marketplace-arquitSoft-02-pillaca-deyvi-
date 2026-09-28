// CAPA 1 - PRESENTACIÓN: rutas del módulo pedidos
const { Router } = require('express');
const controller = require('./pedidos.controller');

const router = Router();

router.get('/', controller.listar);

module.exports = router;
