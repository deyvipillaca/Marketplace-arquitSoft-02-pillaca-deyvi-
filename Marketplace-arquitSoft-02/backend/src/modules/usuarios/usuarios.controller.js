// CAPA 1 - PRESENTACIÓN: recibe HTTP, delega al service y responde JSON
const service = require('./usuarios.service');

async function listar(req, res, next) {
  try {
    const data = await service.listar();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = { listar };
