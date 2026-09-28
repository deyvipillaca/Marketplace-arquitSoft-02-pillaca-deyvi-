const express = require('express');
const cors = require('cors');
const logger = require('./shared/middlewares/logger');
const errorHandler = require('./shared/middlewares/errorHandler');
const usuariosRoutes = require('./modules/usuarios/usuarios.routes');
const sellersRoutes = require('./modules/sellers/sellers.routes');
const catalogoRoutes = require('./modules/catalogo/catalogo.routes');
const carritoRoutes = require('./modules/carrito/carrito.routes');
const pedidosRoutes = require('./modules/pedidos/pedidos.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/api/v1/usuarios', usuariosRoutes);
app.use('/api/v1/sellers', sellersRoutes);
app.use('/api/v1/catalogo', catalogoRoutes);
app.use('/api/v1/carrito', carritoRoutes);
app.use('/api/v1/pedidos', pedidosRoutes);

app.use(errorHandler);

module.exports = app;
