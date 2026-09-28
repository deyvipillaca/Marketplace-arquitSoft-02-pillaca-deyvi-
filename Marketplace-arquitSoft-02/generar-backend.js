const fs = require('fs');
const path = require('path');

const ROOT = path.join(process.cwd(), 'backend');
const MODULOS = ['usuarios', 'sellers', 'catalogo', 'carrito', 'pedidos'];

function escribir(ruta, contenido) {
  const destino = path.join(ROOT, ruta);
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  if (fs.existsSync(destino)) {
    console.log('  (ya existe) ' + ruta);
    return;
  }
  fs.writeFileSync(destino, contenido.trimStart());
  console.log('  creado      ' + ruta);
}

const routes = (m) => `
// CAPA 1 - PRESENTACIÓN: rutas del módulo ${m}
const { Router } = require('express');
const controller = require('./${m}.controller');

const router = Router();

router.get('/', controller.listar);

module.exports = router;
`;

const controller = (m) => `
// CAPA 1 - PRESENTACIÓN: recibe HTTP, delega al service y responde JSON
const service = require('./${m}.service');

async function listar(req, res, next) {
  try {
    const data = await service.listar();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = { listar };
`;

const service = (m) => `
// CAPA 2 - LÓGICA DE NEGOCIO: reglas del módulo ${m}
// Regla: solo usa su propio repository. Para otros módulos, llamar a SU service.
const repository = require('./${m}.repository');

async function listar() {
  return repository.buscarTodos();
}

module.exports = { listar };
`;

const repository = (m) => `
// CAPA 3 - DATOS: acceso a la BD del módulo ${m} (solo sus tablas)
// const { sequelize } = require('../../shared/db');

async function buscarTodos() {
  // TODO: reemplazar por consulta con Sequelize
  return [];
}

module.exports = { buscarTodos };
`;

MODULOS.forEach((m) => {
  escribir('src/modules/' + m + '/' + m + '.routes.js', routes(m));
  escribir('src/modules/' + m + '/' + m + '.controller.js', controller(m));
  escribir('src/modules/' + m + '/' + m + '.service.js', service(m));
  escribir('src/modules/' + m + '/' + m + '.repository.js', repository(m));
});

escribir('src/shared/middlewares/logger.js', `
module.exports = (req, res, next) => {
  console.log(new Date().toISOString() + ' ' + req.method + ' ' + req.originalUrl);
  next();
};
`);

escribir('src/shared/middlewares/auth.js', `
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Token requerido' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ error: 'Token inválido' });
  }
};
`);

escribir('src/shared/middlewares/errorHandler.js', `
module.exports = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Error interno' });
};
`);

escribir('src/shared/db/index.js', `
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
  }
);

module.exports = { sequelize };
`);

const imports = MODULOS.map(
  (m) => "const " + m + "Routes = require('./modules/" + m + "/" + m + ".routes');"
).join('\n');
const montajes = MODULOS.map(
  (m) => "app.use('/api/v1/" + m + "', " + m + "Routes);"
).join('\n');

escribir('src/app.js', `
const express = require('express');
const cors = require('cors');
const logger = require('./shared/middlewares/logger');
const errorHandler = require('./shared/middlewares/errorHandler');
${imports}

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

${montajes}

app.use(errorHandler);

module.exports = app;
`);

escribir('src/server.js', `
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Marketplace API en http://localhost:' + PORT));
`);

escribir('.env.example', `
PORT=3000
JWT_SECRET=cambia_esto
DB_HOST=localhost
DB_PORT=5432
DB_NAME=marketplace_db
DB_USER=postgres
DB_PASSWORD=postgres
`);

escribir('.gitignore', `
node_modules
.env
`);

console.log('\nListo.');
