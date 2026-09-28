// CAPA 1 - PRESENTACIÓN: rutas del módulo carrito
const { Router } = require('express');
const controller = require('./carrito.controller');

const router = Router();

router.get('/', controller.listar);

module.exports = router;
