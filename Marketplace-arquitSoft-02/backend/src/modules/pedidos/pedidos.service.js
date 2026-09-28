// CAPA 2 - LÓGICA DE NEGOCIO: reglas del módulo pedidos
// Regla: solo usa su propio repository. Para otros módulos, llamar a SU service.
const repository = require('./pedidos.repository');

async function listar() {
  return repository.buscarTodos();
}

module.exports = { listar };
