// CAPA 1 - PRESENTACIÓN: rutas del módulo usuarios
const { Router } = require('express');
const controller = require('./usuarios.controller');

const router = Router();

router.get('/', controller.listar);

module.exports = router;
